
var width = 960,
    height = 530,
    color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(false)
    .value(function(d) { return d.size; });
    
    
    


var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .style("width", width + "px")
    .style("height", height + "px");


d3.json("https://wri-01.cartodb.com/api/v2/sql?q=SELECT desig_type as estilo, count(wdpaid) as size FROM protected_areas group by desig_type order by size desc limit 20", function(json) {
	json.children = json.rows;
	delete json.rows;
  div.data([json]).selectAll("div")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.estilo ? color(d.estilo) : null; })
      .call(cell)
      .text(function(d) { return (d.estilo +' ('+ Math.round(d.size) +')') });

  d3.select("#desig_type").on("click", function() {
    loadDataJson("all");
    d3.select("#desig_type").classed("active", true);
    
  });

  d3.select("#desig_eng").on("click", function() {
	loadDataJson("desig_eng");
    d3.select("#desig_eng").classed("active", true);
  });
  d3.select("#iucn_cat").on("click", function() {
	loadDataJson("iucn_cat");
    d3.select("#iucn_cat").classed("active", true);
  });
  d3.select("#iso3").on("click", function() {
	loadDataJson("iso3");
    d3.select("#iso3").classed("active", true);
  });
  d3.select("#status_yr").on("click", function() {
	loadDataJson("status_yr");
    d3.select("#status_yr").classed("active", true);
  });
 
});

function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 5) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 5) + "px"; });
}



function loadDataJson(provincia){
if(provincia=='all'){
thejson="https://wri-01.cartodb.com/api/v2/sql?q=SELECT desig_type as estilo, count(wdpaid) as size FROM protected_areas group by desig_type order by size desc limit 20";
}else{
thejson="http://simbiotica.cartodb.com/api/v2/sql?q=SELECT "+provincia+" as estilo, sum(gis_area) as size FROM protected_areas group by "+provincia+" order by size desc limit 20";
}
d3.json(thejson, function(json) {
//console.log(json)


	json.children = json.rows;
	delete json.rows;
	div.data([json]).selectAll("div").data(treemap.nodes).exit().remove();	
	div.data([json]).selectAll("div").data(treemap.nodes).enter().append("div");	
  div.data([json]).selectAll("div")
      .data(treemap.nodes)
      .attr("class", "cell")
      .style("background", function(d) { return d.estilo ? color(d.estilo) : null; })
      .transition()
        .duration(1500)
      .call(cell)
      .text(function(d) { return (d.estilo +' ('+ Math.round(d.size) +')')  });
      
      });
      d3.selectAll("button").classed("active", false);
      }
function trim (myString)
{
return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}
     