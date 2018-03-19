export function reFormat(data){

   // Calculate Total for Year to represent data as % of Total
    var total = 0;
    data.forEach(function(item){
      total += item.population
    })

    // Add Percent of total and total data
    data.forEach(function(item){
      item.percent = Number(((item.population/total)*100).toFixed(0))
      item.total = total;
  })

  return data
}

export function uniqueValues(data){

  // Extract unique years from data set 
  var uniqueYears = [];
    data.forEach(function(item){
         if(!uniqueYears.includes(item.year)){
            uniqueYears.push(item.year)
         }
     })

    return uniqueYears
}