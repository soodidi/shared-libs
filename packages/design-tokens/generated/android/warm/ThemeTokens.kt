// Généré par @soodidi/design-tokens (thème « Chaleureux ») : ne pas modifier, régénérer (GLB-012).
package com.example.app.core.designsystem

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

internal object ThemeTokens {
    const val NAME = "warm"

    val lightColors =
        lightColorScheme(
            primary = Color(0xFFA8520A),
            onPrimary = Color(0xFFFFFFFF),
            primaryContainer = Color(0xFFE6EFE1),
            onPrimaryContainer = Color(0xFF2F4A28),
            inversePrimary = Color(0xFFF0A64A),
            secondary = Color(0xFFF3EADC),
            onSecondary = Color(0xFF3D2A14),
            secondaryContainer = Color(0xFFF3EADC),
            onSecondaryContainer = Color(0xFF3D2A14),
            tertiary = Color(0xFFE6EFE1),
            onTertiary = Color(0xFF2F4A28),
            tertiaryContainer = Color(0xFFE6EFE1),
            onTertiaryContainer = Color(0xFF2F4A28),
            background = Color(0xFFFCFAF6),
            onBackground = Color(0xFF292524),
            surface = Color(0xFFFCFAF6),
            onSurface = Color(0xFF292524),
            surfaceVariant = Color(0xFFF3EEE6),
            onSurfaceVariant = Color(0xFF68594B),
            surfaceTint = Color(0xFFA8520A),
            inverseSurface = Color(0xFF292524),
            inverseOnSurface = Color(0xFFFCFAF6),
            error = Color(0xFFB91C1C),
            onError = Color(0xFFFFFFFF),
            errorContainer = Color(0xFFB91C1C),
            onErrorContainer = Color(0xFFFFFFFF),
            outline = Color(0xFF958672),
            outlineVariant = Color(0xFFE8DFD2),
            scrim = Color(0xFF000000),
            surfaceBright = Color(0xFFFFFFFF),
            surfaceDim = Color(0xFFF3EEE6),
            surfaceContainerLowest = Color(0xFFFFFFFF),
            surfaceContainerLow = Color(0xFFFFFFFF),
            surfaceContainer = Color(0xFFF3EEE6),
            surfaceContainerHigh = Color(0xFFF3EEE6),
            surfaceContainerHighest = Color(0xFFF3EADC),
        )

    val darkColors =
        darkColorScheme(
            primary = Color(0xFFF0A64A),
            onPrimary = Color(0xFF2A1803),
            primaryContainer = Color(0xFF2B3A26),
            onPrimaryContainer = Color(0xFFCFE3C5),
            inversePrimary = Color(0xFFA8520A),
            secondary = Color(0xFF3A3027),
            onSecondary = Color(0xFFF4EEE6),
            secondaryContainer = Color(0xFF3A3027),
            onSecondaryContainer = Color(0xFFF4EEE6),
            tertiary = Color(0xFF2B3A26),
            onTertiary = Color(0xFFCFE3C5),
            tertiaryContainer = Color(0xFF2B3A26),
            onTertiaryContainer = Color(0xFFCFE3C5),
            background = Color(0xFF1C1815),
            onBackground = Color(0xFFF4EEE6),
            surface = Color(0xFF1C1815),
            onSurface = Color(0xFFF4EEE6),
            surfaceVariant = Color(0xFF2E2822),
            onSurfaceVariant = Color(0xFFB9AB9B),
            surfaceTint = Color(0xFFF0A64A),
            inverseSurface = Color(0xFFF4EEE6),
            inverseOnSurface = Color(0xFF1C1815),
            error = Color(0xFFF28B82),
            onError = Color(0xFF3B0A07),
            errorContainer = Color(0xFFF28B82),
            onErrorContainer = Color(0xFF3B0A07),
            outline = Color(0xFF7A6D60),
            outlineVariant = Color(0xFF3A332C),
            scrim = Color(0xFF000000),
            surfaceBright = Color(0xFF26211C),
            surfaceDim = Color(0xFF2E2822),
            surfaceContainerLowest = Color(0xFF26211C),
            surfaceContainerLow = Color(0xFF26211C),
            surfaceContainer = Color(0xFF2E2822),
            surfaceContainerHigh = Color(0xFF2E2822),
            surfaceContainerHighest = Color(0xFF3A3027),
        )

    val lightStatus =
        StatusColors(
            success = Color(0xFF3F6F2A),
            onSuccess = Color(0xFFFFFFFF),
            warning = Color(0xFF8A5A00),
            onWarning = Color(0xFFFFFFFF),
        )

    val darkStatus =
        StatusColors(
            success = Color(0xFF9BCF86),
            onSuccess = Color(0xFF16290D),
            warning = Color(0xFFF5C451),
            onWarning = Color(0xFF2E2000),
        )

    val shapes =
        Shapes(
            extraSmall = RoundedCornerShape(8.dp),
            small = RoundedCornerShape(8.dp),
            medium = RoundedCornerShape(12.dp),
            large = RoundedCornerShape(18.dp),
            extraLarge = RoundedCornerShape(18.dp),
        )
}
