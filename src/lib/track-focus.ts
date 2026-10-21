/**
 * Canonical track focus: AppData.trackMembership.activeTrackId.
 * Subject-selection activeTrack is a UI mirror only — update membership first.
 */
import { isTrackId, type TrackId } from '../data/tracks.ts';
import {
  emptyTrackMembership,
  normalizeTrackMembership,
  setActiveTrack as setActiveTrackPure,
  enrollTrack as enrollTrackPure,
} from './track-membership.ts';
import type { AppData, TrackMembershipState } from '../types.ts';

export function getFocusTrackId(data: AppData | null | undefined): TrackId | null {
  const id = normalizeTrackMembership(data?.trackMembership ?? emptyTrackMembership()).activeTrackId;
  return id && isTrackId(id) ? id : null;
}

export function getMembershipState(data: AppData | null | undefined): TrackMembershipState {
  return normalizeTrackMembership(data?.trackMembership ?? emptyTrackMembership());
}

/** Pure: set focus among enrolled tracks only. */
export function withFocusTrack(
  data: AppData,
  trackId: TrackId | null,
): { data: AppData; ok: boolean; reason?: string } {
  const mem = getMembershipState(data);
  const r = setActiveTrackPure(mem, trackId);
  if (!r.ok) return { data, ok: false, reason: r.reason };
  return { data: { ...data, trackMembership: r.state }, ok: true };
}

/** Pure: enroll + focus (explicit Begin). */
export function withEnrollAndFocus(
  data: AppData,
  trackId: TrackId,
): { data: AppData; ok: boolean; reason?: string; created?: boolean } {
  const mem = getMembershipState(data);
  const r = enrollTrackPure(mem, trackId);
  if (!r.ok) return { data, ok: false, reason: r.reason };
  return { data: { ...data, trackMembership: r.state }, ok: true, created: r.created };
}
