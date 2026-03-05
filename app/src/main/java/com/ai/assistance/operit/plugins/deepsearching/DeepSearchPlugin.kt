package com.ai.assistance.operit.plugins.deepsearching

import com.ai.assistance.operit.R
import com.ai.assistance.operit.core.chat.plugins.MessageProcessingController
import com.ai.assistance.operit.core.chat.plugins.MessageProcessingExecution
import com.ai.assistance.operit.core.chat.plugins.MessageProcessingHookParams
import com.ai.assistance.operit.core.chat.plugins.MessageProcessingPlugin
import com.ai.assistance.operit.core.chat.plugins.MessageProcessingPluginRegistry
import com.ai.assistance.operit.data.model.InputProcessingState
import com.ai.assistance.operit.data.preferences.ApiPreferences
import com.ai.assistance.operit.plugins.OperitPlugin
import com.ai.assistance.operit.ui.common.markdown.XmlRenderPluginRegistry
import com.ai.assistance.operit.ui.features.chat.components.style.input.common.InputMenuToggleDefinition
import com.ai.assistance.operit.ui.features.chat.components.style.input.common.InputMenuToggleHookParams
import com.ai.assistance.operit.ui.features.chat.components.style.input.common.InputMenuTogglePlugin
import com.ai.assistance.operit.ui.features.chat.components.style.input.common.InputMenuTogglePluginRegistry
import kotlinx.coroutines.flow.first

private const val DEEPSEARCH_FEATURE_KEY = "ai_planning"

private object DeepSearchMessageProcessingPlugin : MessageProcessingPlugin {
    override val id: String = "builtin.deepsearch.message-processing"

    override suspend fun createExecutionIfMatched(
        params: MessageProcessingHookParams
    ): MessageProcessingExecution? {
        val apiPreferences = ApiPreferences.getInstance(params.context)
        val isDeepSearchEnabled =
            apiPreferences.featureToggleFlow(
                featureKey = DEEPSEARCH_FEATURE_KEY,
                defaultValue = ApiPreferences.DEFAULT_FEATURE_TOGGLE_STATE
            ).first()
        if (!isDeepSearchEnabled) {
            return null
        }

        val manager = PlanModeManager(
            context = params.context,
            enhancedAIService = params.enhancedAIService
        )
        val shouldUseDeepSearch = manager.shouldUseDeepSearchMode(params.messageContent)
        if (!shouldUseDeepSearch) {
            return null
        }

        params.enhancedAIService.setInputProcessingState(
            InputProcessingState.ExecutingPlan(
                params.context.getString(R.string.ai_message_executing_deep_search)
            )
        )

        val stream = manager.executeDeepSearchMode(
            userMessage = params.messageContent,
            chatHistory = params.chatHistory,
            workspacePath = params.workspacePath,
            maxTokens = params.maxTokens,
            tokenUsageThreshold = params.tokenUsageThreshold,
            onNonFatalError = params.onNonFatalError
        )
        return MessageProcessingExecution(
            controller =
                object : MessageProcessingController {
                    override fun cancel() {
                        manager.cancel()
                    }
                },
            stream = stream
        )
    }
}

object DeepSearchPlugin : OperitPlugin {
    override val id: String = "builtin.deepsearch"

    override fun register() {
        MessageProcessingPluginRegistry.register(DeepSearchMessageProcessingPlugin)
        XmlRenderPluginRegistry.register(DeepSearchPlanXmlRenderPlugin)
        InputMenuTogglePluginRegistry.register(DeepSearchInputMenuTogglePlugin)
    }
}

private object DeepSearchInputMenuTogglePlugin : InputMenuTogglePlugin {
    override val id: String = "builtin.deepsearch.input-menu"

    override fun createToggles(
        params: InputMenuToggleHookParams
    ): List<InputMenuToggleDefinition> {
        return listOf(
            InputMenuToggleDefinition(
                id = id,
                titleRes = R.string.ai_planning_mode,
                descriptionRes = R.string.ai_planning_desc,
                isChecked = params.featureStates[DEEPSEARCH_FEATURE_KEY] ?: false,
                onToggle = { params.onToggleFeature(DEEPSEARCH_FEATURE_KEY) }
            )
        )
    }
}
