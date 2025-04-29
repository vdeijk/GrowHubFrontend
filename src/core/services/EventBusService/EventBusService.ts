import { EventMap } from '../../../auxiliary/interfaces/EventMap';

class EventBusService<T extends Record<string, object | void>> {
  private eventTarget = new EventTarget();

  public addEventListener<K extends keyof T>(
    type: K,
    listener: (event: CustomEvent<T[K]>) => void,
  ): void {
    this.eventTarget.addEventListener(
      type as string,
      listener as EventListener,
    );
  }

  public removeEventListener<K extends keyof T>(
    type: K,
    listener: (event: CustomEvent<T[K]>) => void,
  ): void {
    this.eventTarget.removeEventListener(
      type as string,
      listener as EventListener,
    );
  }

  public dispatchEvent<K extends keyof T>(
    type: K,
    detail: T[K] extends void ? undefined : T[K],
  ): void {
    this.eventTarget.dispatchEvent(new CustomEvent(type as string, { detail }));
  }
}

const EventBus = new EventBusService<EventMap>();
export default EventBus;
