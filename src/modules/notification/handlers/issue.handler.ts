import { Injectable } from '@nestjs/common';

import { NotificationService } from '../notification.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ISSUE_EVENT } from 'src/shared/enum/event-emitter';
import {
  NotificationChannel,
  NotificationType,
} from 'src/shared/enum/notification';

@Injectable()
export class IssueNotificationHandler {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent(ISSUE_EVENT.ASSIGNED)
  async handleIssueAssigned(event: { issueId: string; assigneeId: string }) {
    await this.notificationService.send({
      userId: event.assigneeId,
      type: NotificationType.ISSUE_ASSIGNED,
      payload: event,
      channels: [NotificationChannel.SSE],
    });
  }
}
