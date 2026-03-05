package com.ai.assistance.operit.plugins.deepsearching

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.ai.assistance.operit.ui.common.markdown.XmlRenderPlugin
import com.ai.assistance.operit.util.stream.Stream

object DeepSearchPlanXmlRenderPlugin : XmlRenderPlugin {
    override val id: String = "builtin.deepsearch.plan.xml-renderer"

    override fun supports(tagName: String): Boolean {
        return tagName == "plan"
    }

    @Composable
    override fun Render(
        xmlContent: String,
        tagName: String,
        modifier: Modifier,
        textColor: Color,
        xmlStream: Stream<String>?
    ) {
        PlanExecutionRenderer(
            content = xmlContent,
            modifier = modifier
        )
    }
}
