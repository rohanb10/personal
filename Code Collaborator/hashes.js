function createFileHash(){
	var ref= new Firebase('https://firepad.firebaseio-demo.com');
	ref=ref.push();
	return ref;
}