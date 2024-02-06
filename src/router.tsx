import { useState } from "react";
import { WithUseStateProblem } from "./WithUseStateProblem";
import { WithUseStateSolution } from "./WithUseStateSolution";
import { ComplexProvider } from "./ProviderSharedState";
import { Reducer } from "./Reducer";
import { Deffered } from "./Deffered";

const routes = {
	withUseStateProblem: "#with-use-state-problem",
	withUseStateSolution: "#with-use-state-solution",
	provider: "#provider",
	cProvider: "#complex-provider",
	reducer: "#reducer",
	deffered: "#deffered",
};

export function Router() {
	const [r, rr] = useState(0);
	const { hash } = window.location;

	return (
		<>
			<nav>
				<ul>
					<li>
						<RouteAnchor to={routes.withUseStateProblem} label="useState Problem" onClick={rr.bind(rr, r + 1)} />
					</li>
					<li>
						<RouteAnchor to={routes.withUseStateSolution} label="useState Solution" onClick={rr.bind(rr, r + 1)} />
					</li>
					<li>
						<RouteAnchor to={routes.provider} label="<Provider />" onClick={rr.bind(rr, r + 1)} />
					</li>
					<li>
						<RouteAnchor to={routes.cProvider} label="<ComplexProvider />" onClick={rr.bind(rr, r + 1)} />
					</li>
					<li>
						<RouteAnchor to={routes.reducer} label="Reducer" onClick={rr.bind(rr, r + 1)} />
					</li>
					<li>
						<RouteAnchor to={routes.deffered} label="Deffered" onClick={rr.bind(rr, r + 1)} />
					</li>
				</ul>
			</nav>
			<main>
				{hash === routes.withUseStateProblem && <WithUseStateProblem />}
				{hash === routes.withUseStateSolution && <WithUseStateSolution />}
				{hash === routes.provider && <div>Provider</div>}
				{hash === routes.cProvider && <ComplexProvider />}
				{hash === routes.reducer && <Reducer />}
				{hash === routes.deffered && <Deffered />}
			</main>
		</>
	);
}

function RouteAnchor({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
	const { hash } = window.location;
	return (
		<a href={to} className={hash === to ? "active" : ""} onClick={onClick}>
			{label}
		</a>
	);
}
