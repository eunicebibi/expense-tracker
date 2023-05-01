module.exports = function (mapDetails) {
  return mapDetails.reduce(
    (acc, cur) => acc + cur.amount, 0
  )
}