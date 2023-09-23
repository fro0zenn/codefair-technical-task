class DiContainer {
  private readonly instances: Map<string, any> = new Map();

  protected getInstance(key: string, creator: (...args: any[]) => any): any {
    if (!this.instances.has(key)) {
      this.instances.set(key, creator());
    }
    return this.instances.get(key);
  }

}

export default DiContainer;
