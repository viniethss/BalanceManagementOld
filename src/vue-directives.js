import Vue from 'vue'

export const textCase = Vue.directive('uppercase', {
	update (el) {
        console.log(el)
		el.value = el.value.toUpperCase()
	},
})
  
function camelize(str) {
return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index == 0 ? word.toLowerCase() : word.toUpperCase();
}).replace(/\s+/g, '');
}