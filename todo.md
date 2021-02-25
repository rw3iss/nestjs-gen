-ADD option to output 'console.log' statements
-ADD option to add logging statements (to some arbitrary logging interface) to all method calls

-ADD option to 'findOneOrFail' vs. just 'findOne' in repositories.

-CHANGE generated module to import forFeature(EntityRepostiroy) instead of forFeature(Entity), if using a custom repository.

-TEST import of other modules into each other, to ensure repository/other dependencies work as expected.

-TODO: look into parent directories for tsconfig(.app)?.json if not found in current.

-ADD JSdoc comments to generated file methods (as a config option);

-ADD prompts to override existing files, or config option.

-ADD demo videos or scenarios
    -ADD docs website?
    -ADD feature request form

-Replace templating engine with quicktemplate:
https://github.com/valyala/quicktemplate