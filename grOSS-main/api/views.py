from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseNotFound
from .security_check import vuln_check, info_check, rb_brakeman, py_analysis_bandit, npm_njsscan, android_mobsfscan, rm_repo
from .description import get_description
from .genuineness import genuine_test, check
from .extract_repo import get_pypi_link, get_npm_link
import json
from os import chdir
from os import getcwd
from urllib.parse import urlparse

@csrf_exempt
def repo_sec(request):
    ret = {"status": "Error"}
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        repo_url = json.loads(body_unicode)['url']
        rm_repo(repo_url)
        vuln_scan = vuln_check(repo_url)
        info_scan = info_check(repo_url)
        rb_scan = rb_brakeman(repo_url)
        py_scan = py_analysis_bandit(repo_url)
        njs_scan = npm_njsscan(repo_url)
        android_scan = android_mobsfscan(repo_url)
        ret = {"vuln_scan": vuln_scan, "info_scan": info_scan, "rb_scan": rb_scan, "py_scan": py_scan, "njs_scan": njs_scan, "android_scan": android_scan}
        chdir("../")
        rm_repo(repo_url)
    return JsonResponse(ret)

@csrf_exempt
def repo_gen(request):
    pass

@csrf_exempt
def description(request):
    ret = {"status": "Error"}
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        repo_url = json.loads(body_unicode)['url']
        url = urlparse(repo_url)
        subdomain = url.hostname
        print(subdomain)
        if subdomain == "pypi.org":
            repo_url = get_pypi_link(repo_url)
        elif subdomain in ["www.npmjs.com", "npmjs.com"]:
            repo_url = get_npm_link(repo_url)
        ret = get_description(repo_url)
        print(ret)
        if(ret == "error"):
            return HttpResponseNotFound("404")
    return JsonResponse(ret, safe=False)

@csrf_exempt
def genuineness_check(request):
    ret = {"status": "Error"}
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        # repo_url = "https://github.com/p1xxxel/vulnlauncher"
        # print(body_unicode)
        repo_url = json.loads(body_unicode)['url']
        repo_data = genuine_test(repo_url)
        ret = check(repo_url, repo_data)
    return JsonResponse(ret, safe=False)
