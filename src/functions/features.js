export function getTaskId (feature, result, isRelease = false) {
  if (isRelease) {
    return `${feature.id}-${result.model}-${result.carrier}-${result.os}`;
  } else if (result.carrier) {
    return `${feature.name}-${result.model}-${result.carrier}-${result.os}`;
  }
  return `${feature.name}-${result.model}-${result.os}`;
}
