install: deps-install
	npx simple-git-hooks

run:
	node ./gendiff.js ./file1.json ./file2.json

deps-install:
	npm ci --legacy-peer-deps

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test