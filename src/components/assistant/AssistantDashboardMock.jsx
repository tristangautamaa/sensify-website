import AssistantChatPanel from './AssistantChatPanel.jsx';
import SensifySitePreview from './SensifySitePreview.jsx';

/**
 * Liquid-glass dashboard frame holding the assistant chat demo and the
 * fake customer-guide console side by side (stacked on small screens).
 */
export default function AssistantDashboardMock() {
  return (
    <div id="assistant-demo" className="liquid-glass rounded-3xl p-3 md:p-4">
      {/* Window chrome */}
      <div className="mb-3 flex items-center gap-2 px-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[rgba(216,90,48,0.7)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[rgba(245,247,250,0.25)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[rgba(55,138,221,0.7)]" />
        <span className="ml-3 text-[0.62rem] font-medium tracking-[0.24em] text-[rgba(245,247,250,0.45)]">
          SENSIFY ASSISTANT — SHOPPING PREVIEW
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <AssistantChatPanel />
        <SensifySitePreview />
      </div>
    </div>
  );
}
