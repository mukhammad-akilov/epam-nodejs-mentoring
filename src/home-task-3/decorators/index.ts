export function methodExucutionTimestamps() {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      const start = new Date(Date.now());
      const result = await originalMethod.apply(this, args);
      const finish = new Date(Date.now());
      console.log(
        `${target.constructor.name}.${propertyKey} Execution time: ${finish.getTime() - start.getTime()} milliseconds`,
      );
      return result;
    };

    return descriptor;
  };
}
