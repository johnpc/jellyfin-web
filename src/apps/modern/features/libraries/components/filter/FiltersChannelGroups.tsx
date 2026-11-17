import React, { FC, useCallback } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import type { LiveTvChannelGroup } from 'apps/modern/features/libraries/hooks/api/useChannelGroups';
import { LibraryViewSettings } from 'types/library';

interface FiltersChannelGroupsProps {
    channelGroupsOptions: LiveTvChannelGroup[];
    libraryViewSettings: LibraryViewSettings;
    setLibraryViewSettings: React.Dispatch<React.SetStateAction<LibraryViewSettings>>;
}

const FiltersChannelGroups: FC<FiltersChannelGroupsProps> = ({
    channelGroupsOptions,
    libraryViewSettings,
    setLibraryViewSettings
}) => {
    const onFiltersChannelGroupsChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            const value = event.target.value;
            const existingIds = libraryViewSettings?.Filters?.ChannelGroupIds ?? [];

            const updatedIds = existingIds.includes(value) ?
                existingIds.filter((filter) => filter !== value) :
                [...existingIds, value];

            setLibraryViewSettings((prevState) => ({
                ...prevState,
                StartIndex: 0,
                Filters: {
                    ...prevState.Filters,
                    ChannelGroupIds: updatedIds.length ? updatedIds : undefined
                }
            }));
        },
        [setLibraryViewSettings, libraryViewSettings.Filters?.ChannelGroupIds]
    );

    return (
        <FormGroup>
            {channelGroupsOptions.map((group) => (
                <FormControlLabel
                    key={group.Id}
                    control={
                        <Checkbox
                            checked={
                                !!libraryViewSettings?.Filters?.ChannelGroupIds?.includes(
                                    group.Id
                                )
                            }
                            onChange={onFiltersChannelGroupsChange}
                            value={group.Id}
                        />
                    }
                    label={`${group.Name} (${group.ChannelCount})`}
                />
            ))}
        </FormGroup>
    );
};

export default FiltersChannelGroups;
