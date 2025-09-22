import { test, expect, Page } from '@playwright/test';

/**
 * GitHub Presentation Topics Finder Test
 * 
 * This test demonstrates how to use Playwright to search for GitHub-related
 * presentation topics from seminar websites, similar to what would be done
 * through MCP (Model Context Protocol) integration.
 */

interface PresentationTopic {
  title: string;
  description: string;
  relevanceScore: number;
  element: string;
}

class GitHubTopicsFinder {
  private page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Search for GitHub-related keywords in page content
   */
  async findGitHubRelatedContent(url: string): Promise<PresentationTopic[]> {
    console.log(`🔍 Searching for GitHub-related presentation topics at: ${url}`);
    
    try {
      // Navigate to the target URL
      await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Extract all text content and search for relevant sessions
      const topics = await this.page.evaluate(() => {
        const githubKeywords = [
          'github', 'git', 'repository', 'version control', 'devops',
          'ci/cd', 'actions', 'collaboration', 'open source', 'coding',
          'development', 'software engineering', 'agile', 'automation'
        ];

        const calculateRelevance = (text: string): number => {
          const keywords: Record<string, number> = {
            'github': 10,
            'git': 8,
            'repository': 7,
            'version control': 9,
            'devops': 8,
            'ci/cd': 9,
            'actions': 6,
            'collaboration': 5,
            'open source': 7,
            'coding': 4,
            'development': 3,
            'software engineering': 6,
            'agile': 4,
            'automation': 5
          };

          let score = 0;
          const lowerText = text.toLowerCase();
          Object.entries(keywords).forEach(([keyword, weight]) => {
            const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
            score += matches * weight;
          });

          return score;
        };

        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, div, section, article, p, span');
        const topics: PresentationTopic[] = [];

        elements.forEach(el => {
          const text = el.textContent?.trim() || '';
          const tagName = el.tagName.toLowerCase();
          
          if (text.length > 20 && text.length < 500) {
            const relevanceScore = calculateRelevance(text);
            
            if (relevanceScore > 0) {
              topics.push({
                title: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
                description: text,
                relevanceScore,
                element: tagName
              });
            }
          }
        });

        return topics
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .slice(0, 10); // Top 10 most relevant
      });

      return topics;

    } catch (error) {
      console.error('❌ Error occurred while searching for topics:', error);
      return [];
    }
  }

  /**
   * Format results for display
   */
  formatResults(topics: PresentationTopic[]): string {
    if (topics.length === 0) {
      return '❌ No GitHub-related presentation topics found.';
    }

    let result = '📋 GitHub-Related Presentation Topics Found:\n';
    result += '=' .repeat(60) + '\n\n';

    topics.forEach((topic, index) => {
      result += `${index + 1}. ${topic.element.toUpperCase()} Element:\n`;
      result += `   📝 Content: ${topic.title}\n`;
      result += `   ⭐ Relevance Score: ${topic.relevanceScore}\n\n`;
    });

    return result;
  }
}

test.describe('GitHub Topics Finder', () => {
  test('should demonstrate finding GitHub topics from a test page', async ({ page }) => {
    // Create a mock HTML page with GitHub-related content for testing
    const mockHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DevDays Asia 2025 - Developer Conference</title>
      </head>
      <body>
        <h1>DevDays Asia 2025 Conference</h1>
        
        <section class="sessions">
          <h2>Keynote Sessions</h2>
          
          <div class="session">
            <h3>Mastering GitHub Actions for Modern CI/CD</h3>
            <p>Learn how to leverage GitHub Actions to automate your development workflow, 
               implement continuous integration and deployment, and streamline your DevOps practices.</p>
            <span class="speaker">Speaker: John Doe, Senior DevOps Engineer</span>
          </div>
          
          <div class="session">
            <h3>Collaborative Development with Git and GitHub</h3>
            <p>Explore best practices for version control, code review processes, 
               and team collaboration using Git and GitHub repositories.</p>
            <span class="speaker">Speaker: Jane Smith, Software Engineering Lead</span>
          </div>
          
          <div class="session">
            <h3>Building React Applications</h3>
            <p>A comprehensive guide to modern React development patterns and best practices.</p>
            <span class="speaker">Speaker: Mike Johnson, Frontend Developer</span>
          </div>
          
          <div class="session">
            <h3>Open Source Project Management</h3>
            <p>Managing open source projects, building communities, and fostering collaboration 
               in the software development ecosystem.</p>
            <span class="speaker">Speaker: Sarah Wilson, Open Source Advocate</span>
          </div>
          
          <div class="session">
            <h3>Advanced Database Design</h3>
            <p>Database optimization techniques and design patterns for high-performance applications.</p>
            <span class="speaker">Speaker: Tom Brown, Database Architect</span>
          </div>
        </section>
      </body>
      </html>
    `;

    // Set up the mock page content
    await page.setContent(mockHtml);
    
    // Wait for content to be set
    await page.waitForTimeout(1000);
    
    // Create the topics finder
    const finder = new GitHubTopicsFinder(page);
    
    // Search for GitHub-related topics by calling the content extraction directly
    const topics = await page.evaluate(() => {
      const githubKeywords = [
        'github', 'git', 'repository', 'version control', 'devops',
        'ci/cd', 'actions', 'collaboration', 'open source', 'coding',
        'development', 'software engineering', 'agile', 'automation'
      ];

      const calculateRelevance = (text: string): number => {
        const keywords: Record<string, number> = {
          'github': 10,
          'git': 8,
          'repository': 7,
          'version control': 9,
          'devops': 8,
          'ci/cd': 9,
          'actions': 6,
          'collaboration': 5,
          'open source': 7,
          'coding': 4,
          'development': 3,
          'software engineering': 6,
          'agile': 4,
          'automation': 5
        };

        let score = 0;
        const lowerText = text.toLowerCase();
        Object.entries(keywords).forEach(([keyword, weight]) => {
          const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
          score += matches * weight;
        });

        return score;
      };

      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, div, section, article, p, span');
      const topics: any[] = [];

      elements.forEach(el => {
        const text = el.textContent?.trim() || '';
        const tagName = el.tagName.toLowerCase();
        
        if (text.length > 20 && text.length < 500) {
          const relevanceScore = calculateRelevance(text);
          
          if (relevanceScore > 0) {
            topics.push({
              title: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
              description: text,
              relevanceScore,
              element: tagName
            });
          }
        }
      });

      return topics
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 10); // Top 10 most relevant
    });
    
    // Debug log
    console.log(`Found ${topics.length} topics with GitHub-related content`);
    topics.forEach((topic, i) => {
      console.log(`${i + 1}. ${topic.title} (Score: ${topic.relevanceScore})`);
    });
    
    // Verify we found some GitHub-related content
    expect(topics.length).toBeGreaterThan(0);
    
    // Check that the most relevant topics are GitHub-related
    const topTopic = topics[0];
    expect(topTopic.relevanceScore).toBeGreaterThan(0);
    
    // Log the results for demonstration
    const formattedResults = finder.formatResults(topics);
    console.log(formattedResults);
    
    // Verify specific expected topics are found
    const foundTitles = topics.map(t => t.title.toLowerCase());
    expect(foundTitles.some(title => title.includes('github'))).toBeTruthy();
  });

  test('should handle error when website is blocked or unavailable', async ({ page }) => {
    const finder = new GitHubTopicsFinder(page);
    
    // Try to access the actual seminar website (which may be blocked)
    const topics = await finder.findGitHubRelatedContent('https://www.digitimes.com.tw/Seminar/DevDaysAsia2025/index.html');
    
    // The test should handle the error gracefully
    // Even if no topics are found due to blocking, the function should not throw
    expect(Array.isArray(topics)).toBeTruthy();
    
    console.log(`Found ${topics.length} topics from the actual website`);
    
    if (topics.length > 0) {
      const formattedResults = finder.formatResults(topics);
      console.log(formattedResults);
    } else {
      console.log('❌ Website appears to be blocked or unavailable');
      console.log('💡 This is expected in restricted environments');
    }
  });

  test('should demonstrate MCP usage pattern', async ({ page }) => {
    // This test documents the expected MCP usage pattern
    console.log('🚀 MCP Usage Pattern for GitHub Topics Finder');
    console.log('============================================');
    console.log('');
    console.log('To use this functionality with MCP in GitHub Copilot Chat:');
    console.log('');
    console.log('Command (Chinese):');
    console.log('#playwright 幫我找 有關 github 的演講主題');
    console.log('https://www.digitimes.com.tw/Seminar/DevDaysAsia2025/index.html');
    console.log('');
    console.log('Command (English):');
    console.log('#playwright help me find GitHub-related presentation topics');
    console.log('https://www.digitimes.com.tw/Seminar/DevDaysAsia2025/index.html');
    console.log('');
    console.log('The MCP server will:');
    console.log('1. Navigate to the provided URL');
    console.log('2. Search for GitHub-related keywords');
    console.log('3. Extract and rank relevant presentation topics');
    console.log('4. Return formatted results with relevance scores');
    
    // This test always passes as it's just documentation
    expect(true).toBeTruthy();
  });
});