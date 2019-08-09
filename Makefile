FUNCTION_NAME:=nostalgia
FUNCTION_REGION:=asia-northeast1

.PHONY: all
all: help

.PHONY: install ## Install dependencies
install:
	yarn

.PHONY: test ## Run test
test:
	ava -v

.PHONY: build ## Build the environment
ENVS:=$(shell cat .env | tr '\n' ' ')
build:
	sed -n -e 's/^\(.*\)=\(.*\)/\1: "\2"/p' .env | grep -v "GOOGLE_APPLICATION_CREDENTIALS" > src/.env.yaml
	travis encrypt "$(ENVS)" --add env

.PHONY: deploy ## Deploy to google cloud functions
deploy:
	gcloud config set project $(GCP_PROJECT)
	cp package.json src/
	cd src && \
	gcloud functions deploy $(FUNCTION_NAME) \
		--runtime nodejs10 \
		--trigger-http \
		--env-vars-file .env.yaml \
		--region $(FUNCTION_REGION) \
		--memory 512MB

.PHONY: help ## View help
help:
	@grep -E '^.PHONY: [a-zA-Z_-]+.*?## .*$$' $(MAKEFILE_LIST) | sed 's/^.PHONY: //g' | awk 'BEGIN {FS = "## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
