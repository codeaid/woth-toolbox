type GoogleEventName =
  | 'help_close'
  | 'help_complete'
  | 'help_open'
  | 'marker_context_color'
  | 'marker_context_coords'
  | 'marker_context_desc'
  | 'marker_edit'
  | 'marker_reset'
  | 'marker_save'
  | 'marker_zones_hide'
  | 'marker_zones_show'
  | 'migration_success'
  | 'settings_language'
  | 'settings_markers_animal'
  | 'settings_markers_animal_rating'
  | 'settings_markers_general'
  | 'settings_markers_need_zone'
  | 'settings_migrate_copy'
  | 'settings_migrate_paste'
  | 'settings_reset';

interface Window {
  gtag: (type: string, name: string, data?: Record<string, unknown>) => void;
}
