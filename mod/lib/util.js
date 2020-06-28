function loadSourceFile(file) {
	let input = file.target

	let reader = new FileReader()
	reader.onload = function(){
        lab.vm.loadSource(reader.result)
	};
	reader.readAsText(input.files[0]);
}

