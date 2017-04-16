// ==UserScript==
// @namespace   BlueFire
// @version     1
// @grant       unsafeWindow
// @include     http://www.bilibili.com/video/*
// @include     http://www.bilibili.com/mobile/video/*
// @include     http://music.163.com/*
// @run-at      document-start
// @name        BilibiliToUWP
// @name:zh-CN  Bilibili调起UWP客户端
// @description 在哔哩哔哩和网易云音乐网页添加使用客户端打开的按钮。
// @description:zh-CN Bilibili调起UWP客户端
// ==/UserScript==

unsafeWindow.Object.freeze = null;
var IsOpenURIWhenPageLoadedEnable = false;
document.addEventListener('DOMContentLoaded', function (event) {
    try {
        window.oneerror = function () { return true; };
        var url = window.location.href;
        var loc;
        var URI = "";
        if (url.indexOf("bilibili.") != -1) {
            loc = url.match("av[0-9]*")[0].match("[0-9].*");
            URI = "bilibili://video/" + loc;
            var ele = document.getElementsByClassName("tminfo");
            var ele2 = document.getElementsByClassName("qr-bottom");
            var openpara = document.createElement("a");
            openpara.innerText = "�ÿͻ��˴���";
            openpara.setAttribute("class", "charge-appeal-init");
            ele2[0].childNodes[1].href = URI;
            ele2[0].childNodes[1].removeAttribute("target");
            //ele[2].childNodes[1].innerText = URI;
            openpara.href = URI;
            ele[0].appendChild(openpara);
        }
        if (url.indexOf("music.163.") != -1) {
            if (url.indexOf("playlist?id=") != -1)   //�жϸ赥
            {
                loc = url.match("id=[0-9]*")[0].match("[1-9].*")[0];
            }
            if (url.indexOf("/playlist/") != -1) {
                loc = url.match("/playlist/[1-9]*")[0].match("[1-9].*")[0];
            }
            //alert(loc);
            //window.location.href = "orpheus://playlist/" + loc;
            URI = "orpheus://playlist/" + loc;
        }
        if (url.indexOf("song") != -1)      //�жϸ���
        {
            if (url.indexOf("song?id=") != -1) {
                loc = url.match("id=[0-9]*")[0].match("[1-9].*")[0];
            }
            if (url.indexOf("/song/") != -1) {
                loc = url.match("/song/[1-9]*")[0].match("[1-9].*")[0];
            }
            URI = "orpheus://song/" + loc;
        }
        if (url.indexOf("album") != -1)     //�ж�ר��
        {
            if (url.indexOf("album?id=") != -1) {
                loc = url.match("id=[0-9]*")[0].match("[1-9].*")[0];
            }
            if (url.indexOf("/album/") != -1) {
                loc = url.match("/album/[1-9]*")[0].match("[1-9].*")[0];
            }
            URI = "orpheus://album/" + loc;
        }
        if (url.indexOf("program?id=") != -1)   //�жϵ�̨��Ŀ
        {
            if (url.indexOf("program?id=") != -1) {
                loc = url.match("id=[0-9]*")[0].match("[1-9].*")[0];
            }
            if (url.indexOf("/program/") != -1) {
                loc = url.match("/program/[1-9]*")[0].match("[1-9].*")[0];
            }
            URI = "orpheus://program/" + loc;
        }
        if (url.indexOf("artist?id=") != -1)    //�жϸ���
        {
            if (url.indexOf("artist?id=") != -1) {
                loc = url.match("id=[0-9]*")[0].match("[1-9].*")[0];
            }
            if (url.indexOf("/artist/") != -1) {
                loc = url.match("/artist/[1-9]*")[0].match("[1-9].*")[0];
            }
            URI = "orpheus://artist/" + loc;
        }
        if (url.indexOf("djradio?id=") != -1)   //�жϵ�̨����
        {
            if (url.indexOf("djradio?id=") != -1) {
                loc = url.match("id=[0-9]*")[0].match("[1-9].*")[0];
            }
            if (url.indexOf("/djradio/") != -1) {
                loc = url.match("/djradio/[1-9]*")[0].match("[1-9].*")[0];
            }
            URI = "orpheus://djradio/" + loc;
        }
        document.documentElement.focus();
        var para = document.createElement("a");
        var childpara = document.createElement("i");
        var node = document.createTextNode("�ÿͻ��˴���");
        childpara.appendChild(node);
        para.setAttribute("class", "u-btni u-btni-dl");
        para.href = URI;
        para.style.marginTop = "7px";
        para.appendChild(childpara);
        var element = document.getElementById("content-operation");
        var element2 = document.getElementsByClassName("btns f-cb j-flag")[0];
        try { element.appendChild(para); } catch (error) { }
        try { element2.appendChild(para); } catch (error) { }

        if (URI !== "" && IsOpenURIWhenPageLoadedEnable) {
            window.location.href = URI;
        }

    }
    catch (error) {
        alert(error);
    }
}, true);
