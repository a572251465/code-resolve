/*

  Testing sourcemaps

*/
/*
  eslint-disable
*/
const __TEST = 1


function preproc (code) {
  return code
}

function postproc (code) {
  return code
}


/*!
  Main
*/
export default function jspp () {

  const filter = id => id || __TEST

  return {

    // name for errors

    name: 'jspp',

    // comment

    run(code, id) {
      if (typeof code != 'string') {
        code = '__CODE'
      }
      if (!filter(id)) {
        return null
      }
      return postproc(preproc(code))
    }
  }

}
