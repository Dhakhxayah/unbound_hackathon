export function checkCriteria(output, criteria) {
    if (!criteria) return true;
  
    switch (criteria.type) {
      case "contains":
        return output.includes(criteria.value);
  
      case "regex":
        return new RegExp(criteria.value).test(output);
  
      case "json":
        try {
          JSON.parse(output);
          return true;
        } catch {
          return false;
        }
  
      default:
        return false;
    }
  }
  