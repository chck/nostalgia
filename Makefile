.PHONY: all
all: help

.PHONY: install ## Install dependencies
install:
	yarn

.PHONY: test ## Run test
test:
	ava tests/main_test.js

.PHONY: deploy ## Deploy to google cloud functions
deploy:
	gcloud config set project $(PROJECT_ID)
	gcloud functions deploy $(FUNCTION_NAME) \
		--runtime nodejs8 \
		--trigger-http \
		--env-vars-file .env.yaml \
		--region $(REGION)

.PHONY: help ## View help
help:
	@grep -E '^.PHONY: [a-zA-Z_-]+.*?## .*$$' $(MAKEFILE_LIST) | sed 's/^.PHONY: //g' | awk 'BEGIN {FS = "## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
