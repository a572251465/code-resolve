require.resolve(`./${CONST_PREFIX0}/${DEFINED_EXPRESSION}/${CONST_SUFFIX0}`);
require.resolve(
	window.baz
		? `./${CONST_PREFIX1}/${DEFINED_EXPRESSION}/${CONST_SUFFIX1}`
		: `./${CONST_PREFIX2}/${DEFINED_EXPRESSION}/${CONST_SUFFIX2}`
);
require.resolve(
	typeof require === "function"
		? `./${CONST_PREFIX3}/${DEFINED_EXPRESSION}/${CONST_SUFFIX3}`
		: `./${CONST_PREFIX4}/${DEFINED_EXPRESSION}/${CONST_SUFFIX4}`
);
