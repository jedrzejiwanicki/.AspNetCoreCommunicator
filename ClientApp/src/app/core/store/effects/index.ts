import { AuthEffects } from '@store/effects/auth.effects';
import { RoomsEffects } from '@store/effects/rooms.effects';
import { MeEffects } from '@store/effects/me.effects';

export const effects = [AuthEffects, RoomsEffects, MeEffects];
