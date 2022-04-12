import { getColorObjectByColorValue } from '@wordpress/block-editor';
import { select } from '@wordpress/data';

import {
	PanelBody,
	ColorPalette,
} from '@wordpress/components';

export default function BackgroundColorPalette( props ) {
	const settings = select( 'core/editor' ).getEditorSettings();
	return (
		<PanelBody title="Couleur du fond">
			<ColorPalette
				colors={ settings.colors }
				value={ props.attributes.backgroundColor }
				onChange={ ( backgroundColor ) =>
					props.setAttributes( {
						backgroundColor,
						backgroundColorClass: `bg-${
							getColorObjectByColorValue(
								settings.colors,
								backgroundColor
							).slug
						}`,
					} )
				}
			/>
		</PanelBody>
	);
}
