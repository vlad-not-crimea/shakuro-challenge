const reverseSearch = (s, a, b) => {

	if (s === '') {
		return -1;
	}
	
    // a,b - допускаются только строки длиной 1, иначе не учитываются
	a = a && a.length === 1 ? a : null;
	b = b && b.length === 1 ? b : null;

    let aIndex = s.lastIndexOf(a);
    let bIndex = s.lastIndexOf(b);
	
    return Math.max(aIndex, bIndex);
}