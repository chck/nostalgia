.PHONY: all
all: help

.PHONY: install ## Install dependencies
install:
	yarn

.PHONY: test ## Run test
test:
	ava -v

.PHONY: build ## Build the environment
ENVS:=$(shell sed -n -e 's/export //p' .envrc | tr '\n' ' ')
build:
	sed -n -e 's/export \(.*\)=\(.*\)/\1: "\2"/p' .envrc > src/.env.yaml
	travis encrypt "$(ENVS)" --add env

.PHONY: deploy ## Deploy to google cloud functions
deploy:
	@make build
	gcloud config set project $(GCP_PROJECT)
	cd src && \
	gcloud functions deploy $(FUNCTION_NAME) \
		--runtime nodejs10 \
		--trigger-http \
		--env-vars-file .env.yaml \
		--region $(FUNCTION_REGION)

.PHONY: help ## View help
help:
	@grep -E '^.PHONY: [a-zA-Z_-]+.*?## .*$$' $(MAKEFILE_LIST) | sed 's/^.PHONY: //g' | awk 'BEGIN {FS = "## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

