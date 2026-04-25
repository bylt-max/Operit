import type {
  ComposeAlignment,
  ComposeArrangement,
  ComposeBorder,
  ComposeChildren,
  ComposeColor,
  ComposeCommonProps,
  ComposeNodeFactory,
  ComposePadding,
  ComposeShape,
  ComposeTextFieldStyle,
  ComposeTextStyle,
  ComposeCanvasCommand,
} from "./compose-dsl";

/**
 * AUTO-GENERATED from Compose Material3/Foundation source signatures.
 * Do not edit manually. Regenerate via tools/compose_dsl/generate_compose_dsl_artifacts.py.
 */

export interface ComposeGeneratedColumnProps extends ComposeCommonProps {
  content?: ComposeChildren;
  horizontalAlignment?: ComposeAlignment;
  verticalArrangement?: ComposeArrangement;
}

export interface ComposeGeneratedRowProps extends ComposeCommonProps {
  content?: ComposeChildren;
  horizontalArrangement?: ComposeArrangement;
  onClick?: () => void | Promise<void>;
  verticalAlignment?: ComposeAlignment;
}

export interface ComposeGeneratedBoxProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentAlignment?: ComposeAlignment;
  propagateMinConstraints?: boolean;
}

export interface ComposeGeneratedSpacerProps extends ComposeCommonProps {
}

export interface ComposeGeneratedLazyColumnProps extends ComposeCommonProps {
  autoScrollToEnd?: boolean;
  content?: ComposeChildren;
  horizontalAlignment?: ComposeAlignment;
  reverseLayout?: boolean;
  spacing?: number;
  verticalArrangement?: ComposeArrangement;
}

export interface ComposeGeneratedLazyRowProps extends ComposeCommonProps {
  content?: ComposeChildren;
  horizontalArrangement?: ComposeArrangement;
  reverseLayout?: boolean;
  verticalAlignment?: ComposeAlignment;
}

export interface ComposeGeneratedTextProps extends ComposeCommonProps {
  color?: ComposeColor;
  fontWeight?: string;
  maxLines?: number;
  overflow?: ComposeTextOverflow;
  softWrap?: boolean;
  style?: ComposeTextStyle;
  text: string;
}

export interface ComposeGeneratedTextFieldProps extends ComposeCommonProps {
  enabled?: boolean;
  isError?: boolean;
  isPassword?: boolean;
  label?: string | ComposeChildren;
  leadingIcon?: ComposeChildren;
  maxLines?: number;
  minLines?: number;
  onValueChange: (value: string) => void;
  placeholder?: string | ComposeChildren;
  prefix?: ComposeChildren;
  readOnly?: boolean;
  singleLine?: boolean;
  style?: ComposeTextFieldStyle;
  suffix?: ComposeChildren;
  supportingText?: ComposeChildren;
  trailingIcon?: ComposeChildren;
  value: string;
}

export interface ComposeGeneratedSwitchProps extends ComposeCommonProps {
  checked: boolean;
  checkedThumbColor?: ComposeColor;
  checkedTrackColor?: ComposeColor;
  enabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  thumbContent?: ComposeChildren;
  uncheckedThumbColor?: ComposeColor;
  uncheckedTrackColor?: ComposeColor;
}

export interface ComposeGeneratedCheckboxProps extends ComposeCommonProps {
  checked: boolean;
  enabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export interface ComposeGeneratedButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentPadding?: ComposePadding;
  enabled?: boolean;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
  text?: string;
}

export interface ComposeGeneratedIconButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  enabled?: boolean;
  icon?: string;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedCardProps extends ComposeCommonProps {
  border?: ComposeBorder;
  containerColor?: ComposeColor;
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  elevation?: number;
  shape?: ComposeShape;
}

export interface ComposeGeneratedMaterialThemeProps extends ComposeCommonProps {
  content?: ComposeChildren;
}

export interface ComposeGeneratedSurfaceProps extends ComposeCommonProps {
  alpha?: number;
  color?: ComposeColor;
  containerColor?: ComposeColor;
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  shadowElevation?: number;
  shape?: ComposeShape;
  tonalElevation?: number;
}

export interface ComposeGeneratedIconProps extends ComposeCommonProps {
  contentDescription?: string;
  name?: string;
  size?: number;
  tint?: ComposeColor;
}

export interface ComposeGeneratedLinearProgressIndicatorProps extends ComposeCommonProps {
  color?: ComposeColor;
  progress?: number;
}

export interface ComposeGeneratedCircularProgressIndicatorProps extends ComposeCommonProps {
  color?: ComposeColor;
  strokeWidth?: number;
}

export interface ComposeGeneratedSnackbarHostProps extends ComposeCommonProps {
}

export interface ComposeGeneratedAssistChipProps extends ComposeCommonProps {
  enabled?: boolean;
  label: ComposeChildren;
  leadingIcon?: ComposeChildren;
  onClick: () => void | Promise<void>;
  trailingIcon?: ComposeChildren;
}

export interface ComposeGeneratedBadgeProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentColor?: ComposeColor;
}

export interface ComposeGeneratedBadgedBoxProps extends ComposeCommonProps {
  badge: ComposeChildren;
  content?: ComposeChildren;
}

export interface ComposeGeneratedDismissibleDrawerSheetProps extends ComposeCommonProps {
  content?: ComposeChildren;
  drawerTonalElevation?: number;
}

export interface ComposeGeneratedDismissibleNavigationDrawerProps extends ComposeCommonProps {
  content?: ComposeChildren;
  drawerContent: ComposeChildren;
  gesturesEnabled?: boolean;
}

export interface ComposeGeneratedDividerProps extends ComposeCommonProps {
  color?: ComposeColor;
  thickness?: number;
}

export interface ComposeGeneratedDropdownMenuProps extends ComposeCommonProps {
  content?: ComposeChildren;
  expanded: boolean;
  offset?: number;
  onDismissRequest: () => void | Promise<void>;
}

export interface ComposeGeneratedElevatedAssistChipProps extends ComposeCommonProps {
  enabled?: boolean;
  label: ComposeChildren;
  leadingIcon?: ComposeChildren;
  onClick: () => void | Promise<void>;
  trailingIcon?: ComposeChildren;
}

export interface ComposeGeneratedElevatedButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  enabled?: boolean;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedElevatedCardProps extends ComposeCommonProps {
  border?: ComposeBorder;
  containerColor?: ComposeColor;
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  elevation?: number;
  shape?: ComposeShape;
}

export interface ComposeGeneratedElevatedFilterChipProps extends ComposeCommonProps {
  enabled?: boolean;
  label: ComposeChildren;
  leadingIcon?: ComposeChildren;
  onClick: () => void | Promise<void>;
  selected: boolean;
  trailingIcon?: ComposeChildren;
}

export interface ComposeGeneratedElevatedSuggestionChipProps extends ComposeCommonProps {
  enabled?: boolean;
  icon?: ComposeChildren;
  label: ComposeChildren;
  onClick: () => void | Promise<void>;
}

export interface ComposeGeneratedExtendedFloatingActionButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedFilledIconButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  enabled?: boolean;
  icon?: string;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedFilledIconToggleButtonProps extends ComposeCommonProps {
  checked: boolean;
  content?: ComposeChildren;
  enabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  shape?: ComposeShape;
}

export interface ComposeGeneratedFilledTonalButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentPadding?: ComposePadding;
  enabled?: boolean;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedFilledTonalIconButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  enabled?: boolean;
  icon?: string;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedFilledTonalIconToggleButtonProps extends ComposeCommonProps {
  checked: boolean;
  content?: ComposeChildren;
  enabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  shape?: ComposeShape;
}

export interface ComposeGeneratedFilterChipProps extends ComposeCommonProps {
  enabled?: boolean;
  label: ComposeChildren;
  leadingIcon?: ComposeChildren;
  onClick: () => void | Promise<void>;
  selected: boolean;
  trailingIcon?: ComposeChildren;
}

export interface ComposeGeneratedFloatingActionButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedHorizontalDividerProps extends ComposeCommonProps {
  color?: ComposeColor;
  thickness?: number;
}

export interface ComposeGeneratedIconToggleButtonProps extends ComposeCommonProps {
  checked: boolean;
  content?: ComposeChildren;
  enabled?: boolean;
  icon?: string;
  onCheckedChange: (checked: boolean) => void;
  shape?: ComposeShape;
}

export interface ComposeGeneratedInputChipProps extends ComposeCommonProps {
  avatar?: ComposeChildren;
  enabled?: boolean;
  label: ComposeChildren;
  leadingIcon?: ComposeChildren;
  onClick: () => void | Promise<void>;
  selected: boolean;
  trailingIcon?: ComposeChildren;
}

export interface ComposeGeneratedLargeFloatingActionButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedLeadingIconTabProps extends ComposeCommonProps {
  enabled?: boolean;
  icon: ComposeChildren;
  onClick: () => void | Promise<void>;
  selected: boolean;
  text: ComposeChildren;
}

export interface ComposeGeneratedListItemProps extends ComposeCommonProps {
  headlineContent: ComposeChildren;
  leadingContent?: ComposeChildren;
  overlineContent?: ComposeChildren;
  shadowElevation?: number;
  supportingContent?: ComposeChildren;
  tonalElevation?: number;
  trailingContent?: ComposeChildren;
}

export interface ComposeGeneratedModalDrawerSheetProps extends ComposeCommonProps {
  content?: ComposeChildren;
  drawerTonalElevation?: number;
}

export interface ComposeGeneratedModalNavigationDrawerProps extends ComposeCommonProps {
  content?: ComposeChildren;
  drawerContent: ComposeChildren;
  gesturesEnabled?: boolean;
}

export interface ComposeGeneratedModalWideNavigationRailProps extends ComposeCommonProps {
  content?: ComposeChildren;
  expandedHeaderTopPadding?: number;
  header?: ComposeChildren;
  hideOnCollapse?: boolean;
  verticalArrangement?: ComposeArrangement;
}

export interface ComposeGeneratedNavigationBarProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  tonalElevation?: number;
}

export interface ComposeGeneratedNavigationDrawerItemProps extends ComposeCommonProps {
  badge?: ComposeChildren;
  icon?: ComposeChildren;
  label: ComposeChildren;
  onClick: () => void | Promise<void>;
  selected: boolean;
}

export interface ComposeGeneratedNavigationRailProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  header?: ComposeChildren;
}

export interface ComposeGeneratedNavigationRailItemProps extends ComposeCommonProps {
  alwaysShowLabel?: boolean;
  enabled?: boolean;
  icon: ComposeChildren;
  label?: ComposeChildren;
  onClick: () => void | Promise<void>;
  selected: boolean;
}

export interface ComposeGeneratedOutlinedButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentPadding?: ComposePadding;
  enabled?: boolean;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedOutlinedCardProps extends ComposeCommonProps {
  border?: ComposeBorder;
  containerColor?: ComposeColor;
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  elevation?: number;
  shape?: ComposeShape;
}

export interface ComposeGeneratedOutlinedIconButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  enabled?: boolean;
  icon?: string;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedOutlinedIconToggleButtonProps extends ComposeCommonProps {
  checked: boolean;
  content?: ComposeChildren;
  enabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  shape?: ComposeShape;
}

export interface ComposeGeneratedPermanentDrawerSheetProps extends ComposeCommonProps {
  content?: ComposeChildren;
  drawerTonalElevation?: number;
}

export interface ComposeGeneratedPermanentNavigationDrawerProps extends ComposeCommonProps {
  content?: ComposeChildren;
  drawerContent: ComposeChildren;
}

export interface ComposeGeneratedPrimaryScrollableTabRowProps extends ComposeCommonProps {
  contentColor?: ComposeColor;
  divider?: ComposeChildren;
  edgePadding?: number;
  indicator?: ComposeChildren;
  selectedTabIndex: number;
  tabs: ComposeChildren;
}

export interface ComposeGeneratedPrimaryTabRowProps extends ComposeCommonProps {
  contentColor?: ComposeColor;
  divider?: ComposeChildren;
  indicator?: ComposeChildren;
  selectedTabIndex: number;
  tabs: ComposeChildren;
}

export interface ComposeGeneratedProvideTextStyleProps extends ComposeCommonProps {
  content?: ComposeChildren;
  style?: ComposeTextStyle;
}

export interface ComposeGeneratedPullToRefreshBoxProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentAlignment?: ComposeAlignment;
  indicator?: ComposeChildren;
  isRefreshing: boolean;
  onRefresh: () => void | Promise<void>;
}

export interface ComposeGeneratedRadioButtonProps extends ComposeCommonProps {
  enabled?: boolean;
  onClick: () => void | Promise<void>;
  selected: boolean;
  shape?: ComposeShape;
}

export interface ComposeGeneratedScaffoldProps extends ComposeCommonProps {
  bottomBar?: ComposeChildren;
  containerColor?: ComposeColor;
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  floatingActionButton?: ComposeChildren;
  snackbarHost?: ComposeChildren;
  topBar?: ComposeChildren;
}

export interface ComposeGeneratedSecondaryScrollableTabRowProps extends ComposeCommonProps {
  contentColor?: ComposeColor;
  divider?: ComposeChildren;
  edgePadding?: number;
  indicator?: ComposeChildren;
  selectedTabIndex: number;
  tabs: ComposeChildren;
}

export interface ComposeGeneratedSecondaryTabRowProps extends ComposeCommonProps {
  contentColor?: ComposeColor;
  divider?: ComposeChildren;
  indicator?: ComposeChildren;
  selectedTabIndex: number;
  tabs: ComposeChildren;
}

export interface ComposeGeneratedShortNavigationBarProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentColor?: ComposeColor;
}

export interface ComposeGeneratedShortNavigationBarItemProps extends ComposeCommonProps {
  enabled?: boolean;
  icon: ComposeChildren;
  label: ComposeChildren;
  onClick: () => void | Promise<void>;
  selected: boolean;
}

export interface ComposeGeneratedSmallFloatingActionButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedSnackbarProps extends ComposeCommonProps {
  action?: ComposeChildren;
  actionOnNewLine?: boolean;
  content?: ComposeChildren;
  contentColor?: ComposeColor;
  dismissAction?: ComposeChildren;
}

export interface ComposeGeneratedSuggestionChipProps extends ComposeCommonProps {
  enabled?: boolean;
  icon?: ComposeChildren;
  label: ComposeChildren;
  onClick: () => void | Promise<void>;
}

export interface ComposeGeneratedTabProps extends ComposeCommonProps {
  content?: ComposeChildren;
  enabled?: boolean;
  onClick: () => void | Promise<void>;
  selected: boolean;
}

export interface ComposeGeneratedTextButtonProps extends ComposeCommonProps {
  content?: ComposeChildren;
  enabled?: boolean;
  onClick: () => void | Promise<void>;
  shape?: ComposeShape;
}

export interface ComposeGeneratedTimePickerDialogProps extends ComposeCommonProps {
  confirmButton: ComposeChildren;
  content?: ComposeChildren;
  dismissButton?: ComposeChildren;
  modeToggleButton?: ComposeChildren;
  onDismissRequest: () => void | Promise<void>;
  title: ComposeChildren;
}

export interface ComposeGeneratedVerticalDividerProps extends ComposeCommonProps {
  color?: ComposeColor;
  thickness?: number;
}

export interface ComposeGeneratedVerticalDragHandleProps extends ComposeCommonProps {
}

export interface ComposeGeneratedWideNavigationRailProps extends ComposeCommonProps {
  content?: ComposeChildren;
  header?: ComposeChildren;
  verticalArrangement?: ComposeArrangement;
}

export interface ComposeGeneratedWideNavigationRailItemProps extends ComposeCommonProps {
  enabled?: boolean;
  icon: ComposeChildren;
  label: ComposeChildren;
  onClick: () => void | Promise<void>;
  railExpanded: boolean;
  selected: boolean;
}

export interface ComposeGeneratedBoxWithConstraintsProps extends ComposeCommonProps {
  content?: ComposeChildren;
  contentAlignment?: ComposeAlignment;
  propagateMinConstraints?: boolean;
}

export interface ComposeGeneratedBasicTextProps extends ComposeCommonProps {
  maxLines?: number;
  overflow?: ComposeTextOverflow;
  softWrap?: boolean;
  style?: ComposeTextStyle;
  text: string;
}

export interface ComposeGeneratedDisableSelectionProps extends ComposeCommonProps {
  content?: ComposeChildren;
}

export interface ComposeGeneratedImageProps extends ComposeCommonProps {
  alpha?: number;
  contentAlignment?: ComposeAlignment;
  contentDescription: string;
  name?: string;
}

export interface ComposeGeneratedSelectionContainerProps extends ComposeCommonProps {
  content?: ComposeChildren;
}

export interface ComposeGeneratedCanvasProps extends ComposeCommonProps {
  commands?: ComposeCanvasCommand[];
}

export interface ComposeMaterial3GeneratedUiFactoryRegistry {
  Column: ComposeNodeFactory<ComposeGeneratedColumnProps>;
  Row: ComposeNodeFactory<ComposeGeneratedRowProps>;
  Box: ComposeNodeFactory<ComposeGeneratedBoxProps>;
  Spacer: ComposeNodeFactory<ComposeGeneratedSpacerProps>;
  LazyColumn: ComposeNodeFactory<ComposeGeneratedLazyColumnProps>;
  LazyRow: ComposeNodeFactory<ComposeGeneratedLazyRowProps>;
  Text: ComposeNodeFactory<ComposeGeneratedTextProps>;
  TextField: ComposeNodeFactory<ComposeGeneratedTextFieldProps>;
  Switch: ComposeNodeFactory<ComposeGeneratedSwitchProps>;
  Checkbox: ComposeNodeFactory<ComposeGeneratedCheckboxProps>;
  Button: ComposeNodeFactory<ComposeGeneratedButtonProps>;
  IconButton: ComposeNodeFactory<ComposeGeneratedIconButtonProps>;
  Card: ComposeNodeFactory<ComposeGeneratedCardProps>;
  MaterialTheme: ComposeNodeFactory<ComposeGeneratedMaterialThemeProps>;
  Surface: ComposeNodeFactory<ComposeGeneratedSurfaceProps>;
  Icon: ComposeNodeFactory<ComposeGeneratedIconProps>;
  LinearProgressIndicator: ComposeNodeFactory<ComposeGeneratedLinearProgressIndicatorProps>;
  CircularProgressIndicator: ComposeNodeFactory<ComposeGeneratedCircularProgressIndicatorProps>;
  SnackbarHost: ComposeNodeFactory<ComposeGeneratedSnackbarHostProps>;
  AssistChip: ComposeNodeFactory<ComposeGeneratedAssistChipProps>;
  Badge: ComposeNodeFactory<ComposeGeneratedBadgeProps>;
  BadgedBox: ComposeNodeFactory<ComposeGeneratedBadgedBoxProps>;
  DismissibleDrawerSheet: ComposeNodeFactory<ComposeGeneratedDismissibleDrawerSheetProps>;
  DismissibleNavigationDrawer: ComposeNodeFactory<ComposeGeneratedDismissibleNavigationDrawerProps>;
  Divider: ComposeNodeFactory<ComposeGeneratedDividerProps>;
  DropdownMenu: ComposeNodeFactory<ComposeGeneratedDropdownMenuProps>;
  ElevatedAssistChip: ComposeNodeFactory<ComposeGeneratedElevatedAssistChipProps>;
  ElevatedButton: ComposeNodeFactory<ComposeGeneratedElevatedButtonProps>;
  ElevatedCard: ComposeNodeFactory<ComposeGeneratedElevatedCardProps>;
  ElevatedFilterChip: ComposeNodeFactory<ComposeGeneratedElevatedFilterChipProps>;
  ElevatedSuggestionChip: ComposeNodeFactory<ComposeGeneratedElevatedSuggestionChipProps>;
  ExtendedFloatingActionButton: ComposeNodeFactory<ComposeGeneratedExtendedFloatingActionButtonProps>;
  FilledIconButton: ComposeNodeFactory<ComposeGeneratedFilledIconButtonProps>;
  FilledIconToggleButton: ComposeNodeFactory<ComposeGeneratedFilledIconToggleButtonProps>;
  FilledTonalButton: ComposeNodeFactory<ComposeGeneratedFilledTonalButtonProps>;
  FilledTonalIconButton: ComposeNodeFactory<ComposeGeneratedFilledTonalIconButtonProps>;
  FilledTonalIconToggleButton: ComposeNodeFactory<ComposeGeneratedFilledTonalIconToggleButtonProps>;
  FilterChip: ComposeNodeFactory<ComposeGeneratedFilterChipProps>;
  FloatingActionButton: ComposeNodeFactory<ComposeGeneratedFloatingActionButtonProps>;
  HorizontalDivider: ComposeNodeFactory<ComposeGeneratedHorizontalDividerProps>;
  IconToggleButton: ComposeNodeFactory<ComposeGeneratedIconToggleButtonProps>;
  InputChip: ComposeNodeFactory<ComposeGeneratedInputChipProps>;
  LargeFloatingActionButton: ComposeNodeFactory<ComposeGeneratedLargeFloatingActionButtonProps>;
  LeadingIconTab: ComposeNodeFactory<ComposeGeneratedLeadingIconTabProps>;
  ListItem: ComposeNodeFactory<ComposeGeneratedListItemProps>;
  ModalDrawerSheet: ComposeNodeFactory<ComposeGeneratedModalDrawerSheetProps>;
  ModalNavigationDrawer: ComposeNodeFactory<ComposeGeneratedModalNavigationDrawerProps>;
  ModalWideNavigationRail: ComposeNodeFactory<ComposeGeneratedModalWideNavigationRailProps>;
  NavigationBar: ComposeNodeFactory<ComposeGeneratedNavigationBarProps>;
  NavigationDrawerItem: ComposeNodeFactory<ComposeGeneratedNavigationDrawerItemProps>;
  NavigationRail: ComposeNodeFactory<ComposeGeneratedNavigationRailProps>;
  NavigationRailItem: ComposeNodeFactory<ComposeGeneratedNavigationRailItemProps>;
  OutlinedButton: ComposeNodeFactory<ComposeGeneratedOutlinedButtonProps>;
  OutlinedCard: ComposeNodeFactory<ComposeGeneratedOutlinedCardProps>;
  OutlinedIconButton: ComposeNodeFactory<ComposeGeneratedOutlinedIconButtonProps>;
  OutlinedIconToggleButton: ComposeNodeFactory<ComposeGeneratedOutlinedIconToggleButtonProps>;
  PermanentDrawerSheet: ComposeNodeFactory<ComposeGeneratedPermanentDrawerSheetProps>;
  PermanentNavigationDrawer: ComposeNodeFactory<ComposeGeneratedPermanentNavigationDrawerProps>;
  PrimaryScrollableTabRow: ComposeNodeFactory<ComposeGeneratedPrimaryScrollableTabRowProps>;
  PrimaryTabRow: ComposeNodeFactory<ComposeGeneratedPrimaryTabRowProps>;
  ProvideTextStyle: ComposeNodeFactory<ComposeGeneratedProvideTextStyleProps>;
  PullToRefreshBox: ComposeNodeFactory<ComposeGeneratedPullToRefreshBoxProps>;
  RadioButton: ComposeNodeFactory<ComposeGeneratedRadioButtonProps>;
  Scaffold: ComposeNodeFactory<ComposeGeneratedScaffoldProps>;
  SecondaryScrollableTabRow: ComposeNodeFactory<ComposeGeneratedSecondaryScrollableTabRowProps>;
  SecondaryTabRow: ComposeNodeFactory<ComposeGeneratedSecondaryTabRowProps>;
  ShortNavigationBar: ComposeNodeFactory<ComposeGeneratedShortNavigationBarProps>;
  ShortNavigationBarItem: ComposeNodeFactory<ComposeGeneratedShortNavigationBarItemProps>;
  SmallFloatingActionButton: ComposeNodeFactory<ComposeGeneratedSmallFloatingActionButtonProps>;
  Snackbar: ComposeNodeFactory<ComposeGeneratedSnackbarProps>;
  SuggestionChip: ComposeNodeFactory<ComposeGeneratedSuggestionChipProps>;
  Tab: ComposeNodeFactory<ComposeGeneratedTabProps>;
  TextButton: ComposeNodeFactory<ComposeGeneratedTextButtonProps>;
  TimePickerDialog: ComposeNodeFactory<ComposeGeneratedTimePickerDialogProps>;
  VerticalDivider: ComposeNodeFactory<ComposeGeneratedVerticalDividerProps>;
  VerticalDragHandle: ComposeNodeFactory<ComposeGeneratedVerticalDragHandleProps>;
  WideNavigationRail: ComposeNodeFactory<ComposeGeneratedWideNavigationRailProps>;
  WideNavigationRailItem: ComposeNodeFactory<ComposeGeneratedWideNavigationRailItemProps>;
  BoxWithConstraints: ComposeNodeFactory<ComposeGeneratedBoxWithConstraintsProps>;
  BasicText: ComposeNodeFactory<ComposeGeneratedBasicTextProps>;
  DisableSelection: ComposeNodeFactory<ComposeGeneratedDisableSelectionProps>;
  Image: ComposeNodeFactory<ComposeGeneratedImageProps>;
  SelectionContainer: ComposeNodeFactory<ComposeGeneratedSelectionContainerProps>;
  Canvas: ComposeNodeFactory<ComposeGeneratedCanvasProps>;
}

