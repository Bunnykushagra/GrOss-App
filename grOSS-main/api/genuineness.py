from datetime import date
from github import Github
import json
import requests
import datetime
from urllib.parse import urlparse

gh_token = "TOKEN_HERE"

def send_req_graphql(graphql_url, headers, json_data):
    r = requests.post(url=graphql_url, json=json_data, headers=headers)
    return r

def get_issues(username, repo_name, graphql_url, headers):
    json_data = { 'query' : '{ repository(owner:"%s", name:"%s") { issues { totalCount } } }' % (username, repo_name)}
    r = send_req_graphql(graphql_url, headers, json_data)
    return r.text.split(':',4)[4].split('}',1)[0]

def get_user_contributions(username, graphql_url, headers):
    date_today = str(date.today())
    curr_year = int(date_today.split('-',2)[0])
    user_data_list = []
    total_contibutions = 0
    date_joined = ""
    # date format = yyyy-mm-dd
    for i in range(2007, curr_year):
        json_data = {
            "query" : 'query { user(login: "%s") { email createdAt contributionsCollection(from: "%s-12-31T23:59:59Z", to: "%s-12-31T23:59:59Z") { contributionCalendar { totalContributions } } } }' %(username, i, i+1)
        }
        r = send_req_graphql(graphql_url, headers, json_data)
        try:
            total_contibutions += (int)(r.text.split(':',9)[9].split('}',1)[0])
        except:
            break
        try:
            date_joined = r.text.split('"',18)[11]
        except:
            break
    # print(date_joined)
    user_data_list.append(total_contibutions)
    user_data_list.append(date_joined)
    return user_data_list

def get_user_data(username, graphql_url, headers):
    g = Github(gh_token)
    user_data_list = []
    cur_user = g.get_user(username)
    user_followers = cur_user.followers
    user_data_list.append(user_followers)
    user_data_list += get_user_contributions(username, graphql_url, headers)
    return user_data_list

def get_repo_data(repo, graphql_url, headers):
    repo_data_list = []
    username = repo.full_name.split("/",1)[0]
    name_repo = repo.full_name.split("/",1)[1]
    date_creation = repo.created_at
    number_forks = repo.forks
    star_count = repo.stargazers_count
    subscriber_count = repo.subscribers_count
    repo_commits = repo.get_commits().totalCount
    total_issues = (int)(get_issues(username, name_repo, graphql_url, headers))
    # print(total_issues)
    # try:
    #     print("License:", base64.b64decode(repo.get_license().content.encode()).decode())
    # except:
    #     pass
    repo_data_list += get_user_data(username, graphql_url, headers)
    # repo_data_list.append(name_repo)
    repo_data_list.append(date_creation)
    repo_data_list.append(number_forks)
    repo_data_list.append(star_count)
    repo_data_list.append(subscriber_count)
    repo_data_list.append(repo_commits)
    repo_data_list.append(total_issues)
    return repo_data_list
    #repo_data_list = [Followers of User, Number of Contributions, Date of Joining, Date of Creation, Number of Forks, Number of Stars, Number of Watchers, Number of Commits, Number of Issues]

def generic_compare(org, mod):
    if(org >= mod):
        return 1
    else:
        return 0

def str_to_date(s):
    # print(s)
    year = (int)(s.split('-',2)[0])
    month = (int)(s.split('-',2)[1])
    day = (int)(s.split('-',2)[2].split('T',1)[0])
    hour = (int)(s.split('T',1)[1].split(':',2)[0])
    minute = (int)(s.split('T',1)[1].split(':',2)[1])
    second = (int)(s.split('T',1)[1].split(':',2)[2].split('Z',1)[0])
    date_to_return = datetime.datetime(year, month, day, hour, minute, second)
    return date_to_return

def joining_date_compare(org, mod):
    date_org = str_to_date(org)
    date_mod = str_to_date(mod)
    return generic_compare(date_mod, date_org)

def repo_compare(original_data, curr_repo_data, repo_url_print):
    # 1 if orginal url github repo is better else 0 for the repo with which our repo is being compared
    # print(len(original_data[2]))
    # print(len(curr_repo_data[2]))
    repo_name = urlparse(repo_url_print).path[1::].split('/')
    repo_name = repo_name[0] + '/' + repo_name[1]
    if(len(original_data[2]) != 0 and len(curr_repo_data[2]) != 0):
        Followers = generic_compare(original_data[0], curr_repo_data[0])
        NumberOfContributions = generic_compare(original_data[1], curr_repo_data[1])
        DateWhenTheUserJoined = joining_date_compare(original_data[2], curr_repo_data[2])
        DateWhenTheRepositoryWasCreated = generic_compare(curr_repo_data[3], original_data[3])
        NumberOfForks = generic_compare(original_data[4], curr_repo_data[4])
        NumberOfStars = generic_compare(original_data[5], curr_repo_data[5])
        NumberOfWatchers = generic_compare(original_data[6], curr_repo_data[6])
        NumberOfCommits = generic_compare(original_data[7], curr_repo_data[7])
        NumberOfIssues = generic_compare(original_data[8], curr_repo_data[8])
        Created = (str)(curr_repo_data[3].month)+'-'+(str)(curr_repo_data[3].day)+'-'+(str)(curr_repo_data[3].year)
        Percent = (str)(DateWhenTheRepositoryWasCreated*5 + DateWhenTheUserJoined*5 + NumberOfForks*10 + NumberOfStars*10 + NumberOfWatchers*10 + NumberOfIssues*10 + NumberOfContributions*10 + Followers*10 + NumberOfCommits*30)+"%"
        out = {
            "repo_link":repo_url_print,
            "repo_name":repo_name,
            "created":Created,
            "followers":curr_repo_data[0],
            "contributions":curr_repo_data[1],
            "forks":curr_repo_data[4],
            "stars":curr_repo_data[5],
            "watchers":curr_repo_data[6],
            "commits":curr_repo_data[7],
            "issues":curr_repo_data[8],
            "Genuineness":Percent
        }
    else:
        NumberOfForks = generic_compare(original_data[4], curr_repo_data[4])
        NumberOfStars = generic_compare(original_data[5], curr_repo_data[5])
        NumberOfWatchers = generic_compare(original_data[6], curr_repo_data[6])
        DateWhenTheRepositoryWasCreated = generic_compare(curr_repo_data[3], original_data[3])
        NumberOfCommits = generic_compare(original_data[7], curr_repo_data[7])
        NumberOfIssues = generic_compare(original_data[8], curr_repo_data[8])
        Percent = (str)(DateWhenTheRepositoryWasCreated*10  + NumberOfForks*20 + NumberOfStars*10 + NumberOfWatchers*20 + NumberOfIssues*10 + NumberOfCommits*30)+"%"
        out = {
            "Repo Link":repo_url_print,
            "Date when the Repository was Created":DateWhenTheRepositoryWasCreated,
            "Number of Forks":NumberOfForks,
            "Number of Stars":NumberOfStars,
            "Number of Watchers":NumberOfWatchers,
            "Number of Commits":NumberOfCommits,
            "Number of Issues":NumberOfIssues,
            "Genuineness":Percent
        }
    return out

def check(github_url, original_data):
    g = Github(gh_token)
    graphql_url = 'https://api.github.com/graphql'
    headers = {'Authorization': 'token %s' % (gh_token)}
    name_repo = github_url.split("/",4)[4]
    if(name_repo[len(name_repo)-1] == '/'):
        name_repo = name_repo[:len(name_repo)-1]
    repo_owner = github_url.split("/",4)[3]
    cmp = dict()
    ret = []
    curr = [{
            "repo_link":github_url,
            "repo_name":repo_owner+'/'+name_repo,
            "followers":original_data[0],
            "contributions":original_data[1],
            "forks":original_data[4],
            "stars":original_data[5],
            "watchers":original_data[6],
            "commits":original_data[7],
            "issues":original_data[8],
            "Genuineness":""
        }]
    ret += curr
    for repo in g.search_repositories(name_repo):
        if((repo.full_name.split("/",1)[1] == name_repo) & (repo.full_name.split("/",1)[0] != repo_owner)):
            curr_repo_data = []
            curr_repo_data += get_repo_data(repo, graphql_url, headers)
            repo_url_print = "https://github.com/"+repo.full_name.split("/",1)[0]+"/"+name_repo
            curr = [repo_compare(original_data, curr_repo_data, repo_url_print)]
            ret += curr
    cmp["result"] = ret
    if (len(cmp) == 0):
        cmp = {
            "Genuineness":100
        }
    return cmp

def genuine_test(github_url):
    g = Github(gh_token)
    # github_url = "https://github.com/p1xxxel/vulnlauncher"
    name_repo = github_url.split("/",4)[4]
    if(name_repo[len(name_repo)-1] == '/'):
        name_repo = name_repo[:len(name_repo)-1]
    repo_owner = github_url.split("/",4)[3]
    original_data = []
    graphql_url = 'https://api.github.com/graphql'
    headers = {'Authorization': 'token %s' % (gh_token)}
    url_repo = g.get_repo(repo_owner+'/'+name_repo)
    original_data += get_repo_data(url_repo, graphql_url, headers)
    return original_data

# github_url = "https://github.com/r3z3l/freesound"

# original_data = genuine_test(github_url)
# print(check(github_url, original_data))