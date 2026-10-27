// Généré par @soodidi/design-tokens (thème « Coloré ») : ne pas modifier, régénérer (GLB-012).
package com.example.app.core.designsystem

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

internal object ThemeTokens {
    const val NAME = "vivid"

    val lightColors =
        lightColorScheme(
            primary = Color(0xFF6D28D9),
            onPrimary = Color(0xFFFFFFFF),
            primaryContainer = Color(0xFFCCFBF1),
            onPrimaryContainer = Color(0xFF134E4A),
            inversePrimary = Color(0xFFB49CFC),
            secondary = Color(0xFFFCE7F3),
            onSecondary = Color(0xFF831843),
            secondaryContainer = Color(0xFFFCE7F3),
            onSecondaryContainer = Color(0xFF831843),
            tertiary = Color(0xFFCCFBF1),
            onTertiary = Color(0xFF134E4A),
            tertiaryContainer = Color(0xFFCCFBF1),
            onTertiaryContainer = Color(0xFF134E4A),
            background = Color(0xFFFDFCFF),
            onBackground = Color(0xFF1E1B3A),
            surface = Color(0xFFFDFCFF),
            onSurface = Color(0xFF1E1B3A),
            surfaceVariant = Color(0xFFF1EFFA),
            onSurfaceVariant = Color(0xFF57527A),
            surfaceTint = Color(0xFF6D28D9),
            inverseSurface = Color(0xFF1E1B3A),
            inverseOnSurface = Color(0xFFFDFCFF),
            error = Color(0xFFDC2626),
            onError = Color(0xFFFFFFFF),
            errorContainer = Color(0xFFDC2626),
            onErrorContainer = Color(0xFFFFFFFF),
            outline = Color(0xFF8A83B0),
            outlineVariant = Color(0xFFE4E0F5),
            scrim = Color(0xFF000000),
            surfaceBright = Color(0xFFFFFFFF),
            surfaceDim = Color(0xFFF1EFFA),
            surfaceContainerLowest = Color(0xFFFFFFFF),
            surfaceContainerLow = Color(0xFFFFFFFF),
            surfaceContainer = Color(0xFFF1EFFA),
            surfaceContainerHigh = Color(0xFFF1EFFA),
            surfaceContainerHighest = Color(0xFFFCE7F3),
        )

    val darkColors =
        darkColorScheme(
            primary = Color(0xFFB49CFC),
            onPrimary = Color(0xFF1E1037),
            primaryContainer = Color(0xFF12403C),
            onPrimaryContainer = Color(0xFF99F6E4),
            inversePrimary = Color(0xFF6D28D9),
            secondary = Color(0xFF4A1D3A),
            onSecondary = Color(0xFFFBCFE8),
            secondaryContainer = Color(0xFF4A1D3A),
            onSecondaryContainer = Color(0xFFFBCFE8),
            tertiary = Color(0xFF12403C),
            onTertiary = Color(0xFF99F6E4),
            tertiaryContainer = Color(0xFF12403C),
            onTertiaryContainer = Color(0xFF99F6E4),
            background = Color(0xFF13111F),
            onBackground = Color(0xFFF4F2FF),
            surface = Color(0xFF13111F),
            onSurface = Color(0xFFF4F2FF),
            surfaceVariant = Color(0xFF262238),
            onSurfaceVariant = Color(0xFFACA6C9),
            surfaceTint = Color(0xFFB49CFC),
            inverseSurface = Color(0xFFF4F2FF),
            inverseOnSurface = Color(0xFF13111F),
            error = Color(0xFFF87171),
            onError = Color(0xFF2A0707),
            errorContainer = Color(0xFFF87171),
            onErrorContainer = Color(0xFF2A0707),
            outline = Color(0xFF665F8C),
            outlineVariant = Color(0xFF2F2A45),
            scrim = Color(0xFF000000),
            surfaceBright = Color(0xFF1D1A2E),
            surfaceDim = Color(0xFF262238),
            surfaceContainerLowest = Color(0xFF1D1A2E),
            surfaceContainerLow = Color(0xFF1D1A2E),
            surfaceContainer = Color(0xFF262238),
            surfaceContainerHigh = Color(0xFF262238),
            surfaceContainerHighest = Color(0xFF4A1D3A),
        )

    val lightStatus =
        StatusColors(
            success = Color(0xFF15803D),
            onSuccess = Color(0xFFFFFFFF),
            warning = Color(0xFFB45309),
            onWarning = Color(0xFFFFFFFF),
        )

    val darkStatus =
        StatusColors(
            success = Color(0xFF4ADE80),
            onSuccess = Color(0xFF052E16),
            warning = Color(0xFFFBBF24),
            onWarning = Color(0xFF2A1A00),
        )

    val shapes =
        Shapes(
            extraSmall = RoundedCornerShape(11.dp),
            small = RoundedCornerShape(11.dp),
            medium = RoundedCornerShape(16.dp),
            large = RoundedCornerShape(24.dp),
            extraLarge = RoundedCornerShape(24.dp),
        )
}
