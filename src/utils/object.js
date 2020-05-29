const renameProp = (
  oldProp,
  newProp,
  {[oldProp]: old, ...others}
) => ({
  [newProp]: old,
  ...others
})

module.exports = {
  renameProp
}
