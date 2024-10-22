import { getInput, setFailed } from "@actions/core";
import { context, getOctokit} from "@actions/github";

export async function run() {
    // fetch inputs
    const token = getInput("gh-token");
    const label = getInput("label");

    // initialize Octokit - GitHub API client
    const octokit = getOctokit(token);
    // get the pull request from the context payload (available since pull request is the event triggering the workflow)
    const pullRequest = context.payload.pull_request;

    try {
        // throw error if workflow is not ran on a pull request only
        if (!pullRequest) {
            throw new Error("This action can only be run on Pull Requests");
        }

        // use GitHub API to add the input label to the pull request
        await octokit.rest.issues.addLabels({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: pullRequest.number,
            labels: [label],
        });
    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

if (!process.env.JEST_WORKER_ID) {
    run();
  }