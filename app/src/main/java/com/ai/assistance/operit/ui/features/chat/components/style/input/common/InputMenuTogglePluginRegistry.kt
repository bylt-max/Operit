package com.ai.assistance.operit.ui.features.chat.components.style.input.common

import androidx.annotation.StringRes
import java.util.concurrent.CopyOnWriteArrayList

data class InputMenuToggleHookParams(
    val context: android.content.Context,
    val featureStates: Map<String, Boolean>,
    val onToggleFeature: (String) -> Unit
)

data class InputMenuToggleDefinition(
    val id: String,
    @StringRes val titleRes: Int = 0,
    @StringRes val descriptionRes: Int = 0,
    val title: String? = null,
    val description: String? = null,
    val isChecked: Boolean,
    val onToggle: () -> Unit
)

interface InputMenuTogglePlugin {
    val id: String

    fun createToggles(params: InputMenuToggleHookParams): List<InputMenuToggleDefinition>
}

object InputMenuTogglePluginRegistry {
    private val plugins = CopyOnWriteArrayList<InputMenuTogglePlugin>()

    @Synchronized
    fun register(plugin: InputMenuTogglePlugin) {
        unregister(plugin.id)
        plugins.add(plugin)
    }

    @Synchronized
    fun unregister(pluginId: String) {
        plugins.removeAll { it.id == pluginId }
    }

    fun createToggles(params: InputMenuToggleHookParams): List<InputMenuToggleDefinition> {
        return plugins.flatMap { plugin -> plugin.createToggles(params) }
    }
}
