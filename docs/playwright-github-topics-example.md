# Finding GitHub Presentation Topics with Playwright MCP

This document demonstrates how to use Playwright with Model Context Protocol (MCP) to find GitHub-related presentation topics from seminar websites.

## Overview

The task is to search for GitHub-related presentation topics from the DevDays Asia 2025 seminar website using Playwright automation through the MCP integration.

## Usage Pattern

With MCP configured, you can use the following command in GitHub Copilot Chat Agent Mode:

```bash
#playwright 幫我找 有關 github 的演講主題
https://www.digitimes.com.tw/Seminar/DevDaysAsia2025/index.html
```

## What This Command Does

When executed through MCP, Playwright will:

1. **Navigate to the target website** - Opens the seminar webpage
2. **Search for GitHub-related content** - Looks for keywords like:
   - "GitHub", "Git", "Repository"
   - "Version Control", "DevOps", "CI/CD"
   - "Actions", "Collaboration", "Open Source"
   - "Software Engineering", "Automation"

3. **Extract relevant presentation information** including:
   - Session titles
   - Speaker names
   - Presentation descriptions
   - Time slots and venue information

4. **Return structured results** with:
   - Relevance scoring
   - Topic categorization
   - Speaker details
   - Session timing

## Expected Output Format

The MCP integration would return results like:

```markdown
## GitHub-Related Presentation Topics Found

### High Relevance Sessions
1. **"Mastering GitHub Actions for CI/CD"**
   - Speaker: John Doe
   - Time: 10:00 AM - 11:00 AM
   - Topics: GitHub Actions, Automation, DevOps
   
2. **"Collaborative Development with Git and GitHub"**
   - Speaker: Jane Smith
   - Time: 2:00 PM - 3:00 PM
   - Topics: Version Control, Collaboration, Code Review

### Medium Relevance Sessions
3. **"Open Source Project Management"**
   - Speaker: Bob Johnson
   - Time: 3:30 PM - 4:30 PM
   - Topics: Open Source, Community Management
```

## Technical Implementation

The MCP Playwright server handles:

- **Web scraping** with proper error handling
- **Content parsing** using CSS selectors and text analysis
- **Keyword matching** with weighted relevance scoring
- **Result formatting** for easy consumption

## Configuration

The MCP configuration is already set up in `.vscode/mcp.json`:

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

## Common Use Cases

This pattern can be applied to:

- Conference websites
- Training program listings
- Workshop schedules
- Webinar calendars
- Tech meetup pages

## Error Handling

The system gracefully handles:

- Network connectivity issues
- Website blocking or restrictions
- Dynamic content loading
- Missing or changed page structure

## Next Steps

After finding relevant topics, you can:

1. **Create follow-up issues** for attending specific sessions
2. **Research speakers** and their backgrounds
3. **Plan your conference schedule** based on GitHub-related content
4. **Prepare questions** for Q&A sessions

---

*This documentation shows the expected behavior when using Playwright MCP to find GitHub presentation topics from seminar websites.*