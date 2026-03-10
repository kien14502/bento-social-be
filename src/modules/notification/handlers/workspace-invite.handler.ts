import { Injectable } from '@nestjs/common';

import { NotificationService } from '../notification.service';
import { OnEvent } from '@nestjs/event-emitter';

import { SseService } from 'src/common/services/sse/sse.service';
import { WORKSPACE_EVENT } from 'src/shared/enum/event-emitter';
import {
  NotificationChannel,
  NotificationType,
} from 'src/shared/enum/notification';

@Injectable()
export class WorkspaceInviteHandler {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly sseService: SseService,
  ) {}

  @OnEvent(WORKSPACE_EVENT.INVITED)
  async handleWorkspaceInvite(event: {
    workspaceId: string;
    userId: string;
    role: string;
  }) {
    await this.notificationService.send({
      userId: event.userId,
      type: NotificationType.WORKSPACE_INVITE,
      payload: event,
      channels: [NotificationChannel.SSE],
    });
  }
}
