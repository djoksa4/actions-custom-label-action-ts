"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
async function run() {
    var _a;
    // fetch inputs
    const token = (0, core_1.getInput)("gh-token");
    const label = (0, core_1.getInput)("label");
    // initialize Octokit - GitHub API client
    const octokit = (0, github_1.getOctokit)(token);
    // get the pull request from the context payload (available since pull request is the event triggering the workflow)
    const pullRequest = github_1.context.payload.pull_request;
    try {
        // throw error if workflow is not ran on a pull request only
        if (!pullRequest) {
            throw new Error("This action can only be run on Pull Requests");
        }
        // use GitHub API to add the input label to the pull request
        await octokit.rest.issues.addLabels({
            owner: github_1.context.repo.owner,
            repo: github_1.context.repo.repo,
            issue_number: pullRequest.number,
            labels: [label]
        });
    }
    catch (error) {
        (0, core_1.setFailed)((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Unknown error");
    }
}
run();
