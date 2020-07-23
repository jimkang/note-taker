pushall:
	git push origin master
	npm publish

test:
	node tests/note-taker-tests.js
