/* 
*  @author whrobbins

	List of capabilites:
		Concept tagging - what are the ideas contained by posts?  Make a wordmap for each location?
		Keyword analysis
		Taxonomy - categorizing keywords/ideas (use for matching to targeted ads?)
		Text Extraction - pulls the important parts from a larger text (let users easily share ideas that we automatically parse from articles?)
		Sentiment - What is the feeling attached to a post?
		
*/
// EXAMPLE:
// var myText = "Whoa, AlchemyAPI's Node.js SDK is really great, I can't wait to build my app!";
// alchemyapi.sentiment("text", myText, {}, function(response) {
// console.log("Sentiment: " + response["docSentiment"]["type"]);
// });

// Lets us get a server up and running
var server = require('http').createServer(app);

var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

function keywords(postContent) {
	alchemyapi.keywords('text', postContent, { 'sentiment':1 }, function(response) {  // {sentiment:1} tells the api to also analyze the sentiment of the keywords
		output = {text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
		alert(output); // For testing
		return output;
	}
	});
}

function text(postContent) {
	alchemyapi.text('text', postContent, {}, function(response) {
		output = { text:postContent, response:JSON.stringify(response,null,4), results:response };
		alert(output);
		return output;
	});
}

function taxonomy(output) {
	alchemyapi.taxonomy('url', demo_url, {}, function(response) {
		output['taxonomy'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
	});
}

function concepts(output) {
	alchemyapi.concepts('text', demo_text, { 'showSourceText':1 }, function(response) {
		output['concepts'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['concepts'] };
	});
}

function sentiment(output) {
	alchemyapi.sentiment('html', demo_html, {}, function(response) {
		output['sentiment'] = { html:demo_html, response:JSON.stringify(response,null,4), results:response['docSentiment'] };
	});
}

