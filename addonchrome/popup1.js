// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var vardiscription=getDiscripton();
var varurl=document.URL;
var vartitle=document.title;
var varkeywords=getKeywords();

var queryInfo = {
active: true,
currentWindow: true
};

chrome.tabs.query(queryInfo, (tabs) => {
var tab = tabs[0];
varurl = tab.url;

fetch("https://localhost:3003/api/auth/addlinkfavorite", {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  //make sure to serialize your JSON body
  body: JSON.stringify({
    role:{
    url1: varurl,
    title1: tab.title,
    description1: '',
    keywords1: ''
      }
  })
})
.then( (response) => { 
   //do something awesome that makes the world a better place
});

});

  


  //document.body.style.backgroundColor="pink";
  function getDiscripton()
  {
    var x = document.getElementsByTagName("META");
    var i;
    for (i = 0; i < x.length; i++) {
        if(x[i].name=='description')
        {
          return x[i].content
        }
    }
    return '';
  }
  function getKeywords()
  {
    var x = document.getElementsByTagName("META");
    var i;
    for (i = 0; i < x.length; i++) {
        if(x[i].name=='keywords')
        {
          return x[i].content
        }
    }
    return '';
  }

document.addEventListener('DOMContentLoaded', () => {
	/*fetch("https://localhost:3003/api/auth/addlinkfavorite", {
	  method: "post",
	  headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	  },

	  //make sure to serialize your JSON body
	  body: JSON.stringify({
		role:{
		url: varurl,
		title: vartitle,
		description: vardiscription,
		keywords: varkeywords
		  }
	  })
	})
	.then( (response) => { 
	   //do something awesome that makes the world a better place
	});*/
	/*
  getCurrentTabUrl((url) => {
    var dropdown = document.getElementById('dropdown');

    // Load the saved background color for this page and modify the dropdown
    // value, if needed.
    getSavedBackgroundColor(url, (savedColor) => {
      if (savedColor) {
        changeBackgroundColor(savedColor);
        dropdown.value = savedColor;
      }
    });
console.log('Tuy dep trai');
    // Ensure the background colorconsole.log('Tuy dep trai'); is changed and saved when the dropdown
    // selection changes.
    dropdown.addEventListener('change', () => {
      changeBackgroundColor(dropdown.value);
      saveBackgroundColor(url, dropdown.value);
    });
  });*/
});
