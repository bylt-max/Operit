package com.ai.assistance.operit.ui.common.markdown

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.ai.assistance.operit.util.stream.Stream
import java.util.concurrent.CopyOnWriteArrayList

interface XmlRenderPlugin {
    val id: String

    fun supports(tagName: String): Boolean

    @Composable
    fun Render(
        xmlContent: String,
        tagName: String,
        modifier: Modifier,
        textColor: Color,
        xmlStream: Stream<String>?
    )
}

object XmlRenderPluginRegistry {
    private val plugins = CopyOnWriteArrayList<XmlRenderPlugin>()

    @Synchronized
    fun register(plugin: XmlRenderPlugin) {
        unregister(plugin.id)
        plugins.add(plugin)
    }

    @Synchronized
    fun unregister(pluginId: String) {
        plugins.removeAll { it.id == pluginId }
    }

    @Composable
    fun RenderIfMatched(
        xmlContent: String,
        tagName: String,
        modifier: Modifier,
        textColor: Color,
        xmlStream: Stream<String>?
    ): Boolean {
        val plugin = plugins.firstOrNull { it.supports(tagName) } ?: return false
        plugin.Render(
            xmlContent = xmlContent,
            tagName = tagName,
            modifier = modifier,
            textColor = textColor,
            xmlStream = xmlStream
        )
        return true
    }
}
