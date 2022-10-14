import { Subjects, Publisher, ExpirationCompleteEvent } from 'mz-tools';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
