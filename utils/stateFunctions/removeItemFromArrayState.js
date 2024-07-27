const removeItemFromArrayState = (index, setList, listLength) => {
	if (!listLength) return;
	setList(prev => {
		if (index === 0 && listLength > 1) return prev.slice(1);
		if (index === 0 && listLength === 1) return [];
		if (index === listLength - 1) return prev.slice(0, index);
		const firstHalf = prev.slice(0, index)
		const secondHalf = prev.slice(index + 1)
		return firstHalf.concat(secondHalf)
	})
}
export {removeItemFromArrayState}