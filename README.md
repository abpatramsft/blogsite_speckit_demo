# Building with github spec-kit

This repository aims at helping you build build applications with spec-kit based development framework.

The entire project was created via spec-kit based development. The final code produced using github copilot along with spec-kit has been moved into the `blogsite_project/` folder and `blogsite_project_feature_1/` folder.


## Prerequisites

Before you start, ensure you have installed spec-kit via terminal:

```shell
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```


## Demo Structure

| Exercise | Duration | Focus Area | Output Codebase
|----------|----------|------------|--------------------|
| [Exercise 1: Building an application from scratch usign spec-kit](Building%20with%20spec-kit.md) | 20 min | Spec-kit based development for net new application development | [blogsite_project](blogsite_project)
| [Exercise 2: Refactoring large applications using spec-kit](Refactoring%20with%20spec-kit.md) | 30 min |How to leverage spec-kit to update pre-existing codebases | [blogsite_project_feature_1](blogsite_project_feature_1)



## Run the blogsite artefact from the build exercice

Navigate to the project directory and run:

```bash
cd blogsite_project
npm install  # if needed
npm run dev  # for development
npm run build  # for production build
```

For more details, see [blogsite_project/README.md](blogsite_project/README.md)


## Run the updated blogsite artefact from the refactor exercice

```bash
cd blogsite_project_feature_1
npm install  # if needed
npm run dev  # for development
npm run build  # for production build
```

For more details, see [blogsite_project_feature_1/README.md](blogsite_project_feature_1/README.md)

