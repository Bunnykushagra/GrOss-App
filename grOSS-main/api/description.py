from github import Github
import json
from urllib.parse import urlparse

def get_description(github_url):
    try:
        g = Github()
        # github_url = "https://github.com/p1xxxel/vulnlauncher"
        name_repo = urlparse(github_url).path[1::]
        if(name_repo[len(name_repo)-1] == '/'):
            name_repo = name_repo[:len(name_repo)-1]
        print(name_repo)
        repo = g.get_repo(name_repo)
        repo_owner = github_url.split("/",4)[3]
        name = github_url.split("/",4)[4]
        description = repo.description
        date_creation = repo.created_at
        number_forks = repo.forks
        star_count = repo.stargazers_count
        subscriber_count = repo.subscribers_count
        repo_commits = repo.get_commits().totalCount

        out = {
            "RepoURL": github_url,
            "Repository_Name":name_repo,
            "Author":repo_owner,
            "Description":description,
            "Number of Stars":star_count,
            "Number of Watchers":subscriber_count
        }
        return json.dumps(out)
    except:
        return "error"

