# GitHub Topics Finder with Playwright MCP

## Overview

This feature demonstrates how to use Playwright with Model Context Protocol (MCP) to automatically find GitHub-related presentation topics from seminar websites. It's implemented as part of the Tailspin Toys project to showcase the integration of AI agents with web automation tools.

## Features

- **Automated Web Scraping**: Navigate to conference/seminar websites automatically
- **Smart Content Analysis**: Use keyword matching with relevance scoring to identify GitHub-related topics
- **Structured Results**: Return formatted presentation information with speakers, times, and topics
- **Error Handling**: Gracefully handle blocked websites or network issues
- **Extensible Pattern**: Can be adapted for other conference websites and topic searches

## Usage

### With MCP (Model Context Protocol)

If you have the Playwright MCP server configured, you can use this command in GitHub Copilot Chat Agent Mode:

```bash
#playwright 幫我找 有關 github 的演講主題
https://www.digitimes.com.tw/Seminar/DevDaysAsia2025/index.html
```

Or in English:
```bash
#playwright help me find GitHub-related presentation topics
https://www.digitimes.com.tw/Seminar/DevDaysAsia2025/index.html
```

### Running Tests

To see the functionality in action, run the Playwright tests:

```bash
cd client
npm run test:e2e -- github-topics-finder.spec.ts
```

## Implementation Details

### File Structure

```
client/
├── e2e-tests/
│   └── github-topics-finder.spec.ts    # Main implementation and tests
├── playwright.config.ts                # Playwright configuration
└── package.json                        # Dependencies

docs/
├── github-topics-finder-README.md      # This file
├── playwright-github-topics-example.md # Detailed usage examples
└── 2-mcp.zh-TW.md                      # Chinese documentation with examples
```

### Key Components

1. **GitHubTopicsFinder Class**: Main class that handles web scraping and content analysis
2. **Relevance Scoring**: Algorithm that scores content based on GitHub-related keywords
3. **Content Extraction**: Parses HTML elements to find presentation topics
4. **Result Formatting**: Structures output for easy reading

### Keywords and Scoring

The system searches for these keywords with weighted scoring:

| Keyword | Weight | Description |
|---------|--------|-------------|
| github | 10 | Highest priority for GitHub-specific content |
| version control | 9 | Version control systems |
| ci/cd | 9 | Continuous integration/deployment |
| git | 8 | Git version control |
| devops | 8 | DevOps practices |
| repository | 7 | Code repositories |
| open source | 7 | Open source development |
| actions | 6 | GitHub Actions or similar automation |
| software engineering | 6 | General software engineering |
| collaboration | 5 | Team collaboration |
| automation | 5 | Process automation |
| coding | 4 | Programming/coding |
| agile | 4 | Agile methodologies |
| development | 3 | General development |

## Sample Output

When successful, the finder returns structured results like:

```
📋 GitHub-Related Presentation Topics Found:
============================================================

1. DIV Element:
   📝 Content: Mastering GitHub Actions for Modern CI/CD...
   ⭐ Relevance Score: 76

2. DIV Element:
   📝 Content: Collaborative Development with Git and GitHub...
   ⭐ Relevance Score: 75

3. P Element:
   📝 Content: Explore best practices for version control...
   ⭐ Relevance Score: 40
```

## Configuration

### MCP Configuration

The `.vscode/mcp.json` file includes the Playwright server configuration:

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["--yes", "mcp-playwright"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

### Playwright Configuration

The `playwright.config.ts` file is configured to work with the local development server:

```typescript
export default defineConfig({
  testDir: './e2e-tests',
  fullyParallel: true,
  workers: 5,
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  webServer: {
    command: '../scripts/start-app.sh',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

## Error Handling

The system handles common issues gracefully:

- **Network Restrictions**: When websites are blocked by firewalls or network policies
- **DNS Resolution**: When domain names cannot be resolved
- **Dynamic Content**: When content loads asynchronously
- **Missing Elements**: When expected page structure is not found

## Extension Ideas

This pattern can be extended for:

1. **Multi-language Support**: Add keyword translations for international conferences
2. **Speaker Information**: Extract detailed speaker bios and social media links
3. **Schedule Integration**: Parse time slots and create calendar events
4. **Topic Categories**: Classify presentations into development areas (frontend, backend, mobile, etc.)
5. **Recommendation Engine**: Suggest related sessions based on interests
6. **Notification System**: Alert when new relevant sessions are announced

## Testing

The implementation includes comprehensive tests:

- **Mock Content Test**: Tests the parsing logic with controlled HTML content
- **Error Handling Test**: Verifies graceful handling of blocked websites
- **Documentation Test**: Demonstrates the MCP usage pattern

Run tests with:
```bash
npx playwright test github-topics-finder.spec.ts --reporter=line
```

## Contributing

When extending this functionality:

1. Follow the existing code patterns in `github-topics-finder.spec.ts`
2. Add tests for new keyword categories or website structures
3. Update the relevance scoring algorithm as needed
4. Maintain backward compatibility with the MCP interface
5. Document any new features in this README

## Related Documentation

- [Playwright MCP Server Documentation](https://github.com/microsoft/playwright-mcp)
- [Model Context Protocol Overview](https://github.blog/ai-and-ml/llms/what-the-heck-is-mcp-and-why-is-everyone-talking-about-it/)
- [GitHub Copilot Agent Mode](https://docs.github.com/en/copilot/using-github-copilot/agents)
- [Exercise 2 - MCP Setup (Chinese)](./2-mcp.zh-TW.md)

---

*This feature demonstrates the power of combining AI agents with web automation tools to extract valuable information from conference websites automatically.*