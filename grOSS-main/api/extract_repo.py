#!/usr/bin/python3

import requests
from bs4 import BeautifulSoup

def get_pypi_link(repo_url):
    print(repo_url)
    r = requests.get(repo_url)
    soup = BeautifulSoup(r.content, 'lxml')
    for link in soup.select("a[href^='http://github.com/'],a[href^='https://github.com']"):
        if link.get('href').count('/') == 4:
            return link.get('href')
    return "error"

def get_npm_link(repo_url):
    r = requests.get(repo_url)
    soup = BeautifulSoup(r.content, 'lxml')
    for link in soup.select("a[href^='http://github.com/'],a[href^='https://github.com']"):
        if link.get('href').count('/') == 4:
            return link.get('href')
    return "error"
