const conversor = document.querySelector('#conversor')

conversor.addEventListener('change', () => {
	let option = document.querySelectorAll('.cbxMeasure')
	let template 
	switch(parseInt(conversor.value)){
		case 1:
			template = templateTemperature()
			break;
		case 2:
			template = templateTiempo()
			break;
		case 3:
			template = templateLongitude()
			break;
		default:
			template = ''
	}

	for (let i = 0 ; i < option.length; i++){
		option[i].innerHTML = template
		option[i].value = option[i].options[i].value
	}
	calculateMeasure(0)
})


const getTbxResult = function (index) {
	let tbxResult = document.querySelectorAll('.result')
	return tbxResult[index]
}

const getTbxResultValue = function (index) {
	let input = getTbxResult(index)
	return input.value
}

const setTbxResultValue = function (index, value) {
	let input = getTbxResult(index)
	input.value = value
}

const getCbxMeasure = function (index) {
	let cbxMeasure = document.querySelectorAll('.cbxMeasure')
	return cbxMeasure[index]
}

const getCbxMeasureValue = function (index) {
	let input = getCbxMeasure(index)
	return input.value
}

const setCbxMeasureValue = function (index, value) {
	let input = getCbxMeasure(index)
	input.value = value
}

const templateTemperature = function (){
	return `<option value="gc">Grados Celcius</option>
			<option value="gf">Grados Fahrenheit</option>
			<option value="gk">Kelvin</option>`
}
const templateTiempo = function(){
	return `<option value="sg">Segundos</option>
			<option value="min">Minutos</option>
			<option value="h">Hora</option>`
}

const templateLongitude = function(){
	return `<option value="mm">Milimetros</option>
			<option value="cm">Centimetros</option>
			<option value="mt">Metros</option>`
}

const swapIndex = function (i) {
	return i * -1 + 1
}

const swapCbxMeasure = function (index) {
	let swap = swapIndex(index)
	let cbxMeasure = getCbxMeasure(swap)

	setCbxMeasureValue(swap, cbxMeasure.options[swapIndex(cbxMeasure.selectedIndex)].value)
}

const choiceFuncCalc = function (index) {
	return `${getCbxMeasure(index).value}To${getCbxMeasure(swapIndex(index)).value}`
}

const generateFuncCalc = function (index) {
	let functionName = choiceFuncCalc(index)
	if(typeof measure[functionName] === 'function') 
		return measure[functionName]
}

const cbxCalc = function (index) {
	if(checkEqualsMeasure())
		swapCbxMeasure(index)
	calculateMeasure(index)
}

const checkEqualsMeasure = function () {
	return getCbxMeasureValue(0) === getCbxMeasureValue(1)
}

const tbxCalc = function (index) {
	calculateMeasure(index)
}

const calculateMeasure = function (index) {
	let measureF = generateFuncCalc(index)
	let value = getTbxResultValue(index)
	if(value.trim().length  === 0 || isNaN(value))
		return
	let result = calc(value, measureF)
	showResult(index, result)
}

const showResult = function (index, value) {
	let resultInput = getTbxResult(swapIndex(index))
	resultInput.value = value
}

const calc = function (value, f) {
	return parseFloat(f(value).toFixed())
}

const measure = {}
/*--------------FUNCIONES DE OPREACION DE LA TEMPERATURA--------------*/
measure.gcTogf = function(temperatura){
	return 9 * temperatura / 5 + 32
}
measure.gcTogk = function(temperatura){
	return temperatura + 273.15
}
measure.gfTogc = function(temperatura){
	return 5 * (temperatura - 32) / 9
}
measure.gfTogk = function(temperatura){
	return (temperatura - 32) * 5/9 + 273.15
}
measure.gkTogc = function(temperatura){
	return temperatura - 273.15
}
measure.gkTogf = function(temperatura){
	return (temperatura - 273.15) * 9/5 + 32
}
/*--------------FUNCIONES DE OPREACION DEL TIEMPO------------*/
measure.sgTomin = function(tiempo){
	return tiempo / 60
}
measure.sgToh = function(tiempo){
	return tiempo / 3600
}
measure.minTosg= function(tiempo){
	return tiempo * 60
}
measure.minToh= function(tiempo){
	return tiempo / 60
}
measure.hTosg= function(tiempo){
	return tiempo * 3600
}
measure.hTomin= function(tiempo){
	return tiempo * 60
}
/*--------------FUNCIONES DE OPREACION DE LA LONGITUD------------*/
measure.mmTocm = function(longitud){
	return longitud / 10
}
measure.mmTomt = function(longitud){
	return longitud / 1000
}
measure.cmTomm = function(longitud){
	return longitud * 10
}
measure.cmTomt = function(longitud){
	return longitud / 100
}
measure.mtTomm = function(longitud){
	return longitud * 1000
}
measure.mtTocm = function(longitud){
	return longitud * 100
}
