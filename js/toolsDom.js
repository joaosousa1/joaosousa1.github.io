// copyright João Sousa 2022 //
var icons = document.getElementsByClassName("svgIcons")
function addSVGIcon(ele) {
    let iconName = ele.getAttribute("data-icon-name");
    if ( svgIcons[iconName] == undefined){
        ele.innerHTML = ""
    } else {
    ele.innerHTML = svgIcons[iconName]
    }
}
for (let i = 0; i < icons.length; i++) {
    addSVGIcon(icons[i])
}